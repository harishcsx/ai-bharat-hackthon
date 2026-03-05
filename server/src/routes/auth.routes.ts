import { Router, Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { prisma } from '../utils/prisma';
import jwt from 'jsonwebtoken';

const router = Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google', async (req: Request, res: Response): Promise<any> => {
    try {
        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({ success: false, message: 'Google credential missing' });
        }

        // Verify the token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        if (!payload || !payload.email) {
            return res.status(400).json({ success: false, message: 'Invalid Google token payload' });
        }

        const { email, name } = payload;

        // Enforce @giet.edu domain restriction
        if (!email.endsWith('@giet.edu')) {
            return res.status(403).json({
                success: false,
                message: 'Access restricted to @giet.edu domain'
            });
        }

        // Check if user exists
        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            // Create user if they don't exist
            user = await prisma.user.create({
                data: {
                    email,
                    name: name || email.split('@')[0],
                    password: '', // Password is not used for Google OAuth users, but required in schema
                    role: 'STUDENT', // Default role
                }
            });
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user.id, role: user.role, email: user.email },
            process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
            { expiresIn: '24h' }
        );

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        res.status(200).json({
            success: true,
            token,
            user: userWithoutPassword
        });

    } catch (error) {
        console.error('Google Auth Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error during Google Authentication' });
    }
});

export default router;
