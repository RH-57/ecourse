import crypto from 'crypto'

const SESSION_COOKIE = 'ecourse_session'

function sha256(input: string): string {
    return crypto.createHash('sha256').update(input).digest('hex')
}

function generateToken(): string {
    return crypto.randomBytes(32).toString('base64url')
}

export {sha256, generateToken, SESSION_COOKIE}