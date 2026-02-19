const sanitizeHtml = require('sanitize-html');

/**
 * Sanitization configuration that blocks XSS payloads:
 * - Removes all HTML tags (script, img, svg, etc.)
 * - Removes all event handlers (onerror, onload, onclick, etc.)
 * - Removes javascript: URLs and data: URLs
 */
const sanitizeConfig = {
    allowedTags: [], // No HTML tags allowed - strips all HTML
    allowedAttributes: {}, // No attributes allowed
    disallowedTagsMode: 'recursiveEscape', // Escape content of disallowed tags
    allowedSchemes: [], // No URL schemes allowed (blocks javascript:, data:, etc.)
    allowedSchemesByTag: {},
    allowedSchemesAppliedToAttributes: [],
    parseStyleAttributes: false, // Don't parse style attributes
    // Extra protection against XSS vectors
    exclusiveFilter: function(frame) {
        // Block any tags that might contain script content
        const dangerousTags = ['script', 'iframe', 'object', 'embed', 'svg', 'math', 'template'];
        return dangerousTags.includes(frame.tag);
    }
};

/**
 * Sanitizes a single string value
 * @param {string} value - The string to sanitize
 * @returns {string} - Sanitized string
 */
function sanitizeString(value) {
    if (typeof value !== 'string') {
        return value;
    }
    
    // First pass: remove dangerous patterns before HTML sanitization
    let sanitized = value
        // Remove script tags and their content
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        // Remove event handlers like onerror, onload, onclick, onmouseover, etc.
        .replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '')
        .replace(/\s*on\w+\s*=\s*[^\s>]*/gi, '')
        // Remove javascript: URLs
        .replace(/javascript\s*:/gi, '')
        // Remove data: URLs that might contain scripts
        .replace(/data\s*:\s*text\/html/gi, '')
        // Remove vbscript: URLs
        .replace(/vbscript\s*:/gi, '')
        // Remove expression() CSS
        .replace(/expression\s*\(/gi, '');
    
    // Second pass: use sanitize-html to strip remaining HTML
    sanitized = sanitizeHtml(sanitized, sanitizeConfig);
    
    // Trim whitespace
    return sanitized.trim();
}

/**
 * Recursively sanitizes all string values in an object or array
 * @param {any} data - The data to sanitize
 * @returns {any} - Sanitized data
 */
function sanitizeObject(data) {
    if (data === null || data === undefined) {
        return data;
    }
    
    if (typeof data === 'string') {
        return sanitizeString(data);
    }
    
    if (Array.isArray(data)) {
        return data.map(item => sanitizeObject(item));
    }
    
    if (typeof data === 'object') {
        const sanitized = {};
        for (const key of Object.keys(data)) {
            // Also sanitize object keys to prevent prototype pollution
            const sanitizedKey = sanitizeString(key);
            sanitized[sanitizedKey] = sanitizeObject(data[key]);
        }
        return sanitized;
    }
    
    // Return non-string primitives (numbers, booleans) as-is
    return data;
}

/**
 * Express middleware that sanitizes req.body, req.query, and req.params
 * Use this middleware on routes that accept user input
 */
function sanitizeMiddleware(req, res, next) {
    try {
        if (req.body && typeof req.body === 'object') {
            req.body = sanitizeObject(req.body);
        }
        
        if (req.query && typeof req.query === 'object') {
            req.query = sanitizeObject(req.query);
        }
        
        if (req.params && typeof req.params === 'object') {
            req.params = sanitizeObject(req.params);
        }
        
        next();
    } catch (error) {
        console.error('Sanitization Error:', error);
        next();
    }
}

/**
 * Sanitize specific fields from req.body
 * @param {string[]} fields - Array of field names to sanitize
 * @returns {Function} - Express middleware
 */
function sanitizeFields(...fields) {
    return (req, res, next) => {
        try {
            for (const field of fields) {
                if (req.body && req.body[field] !== undefined) {
                    req.body[field] = sanitizeObject(req.body[field]);
                }
            }
            next();
        } catch (error) {
            console.error('Sanitization Error:', error);
            next();
        }
    };
}

module.exports = {
    sanitizeString,
    sanitizeObject,
    sanitizeMiddleware,
    sanitizeFields
};
