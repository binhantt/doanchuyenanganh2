"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({
                    success: false,
                    message: 'Email and password are required',
                });
                return;
            }
            const result = await this.authService.login(email, password);
            if (!result) {
                res.status(401).json({
                    success: false,
                    message: 'Invalid email or password',
                });
                return;
            }
            res.json({
                success: true,
                data: {
                    token: result.token,
                    user: {
                        id: result.user.id,
                        email: result.user.email,
                        fullName: result.user.fullName,
                        role: result.user.role,
                    },
                },
            });
        }
        catch (error) {
            // Handle specific error for inactive account
            if (error instanceof Error && error.message.includes('vô hiệu hóa')) {
                res.status(403).json({
                    success: false,
                    message: error.message,
                });
                return;
            }
            res.status(500).json({
                success: false,
                message: 'Login failed',
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }
    async verify(req, res) {
        try {
            const token = req.headers.authorization?.replace('Bearer ', '');
            if (!token) {
                res.status(401).json({
                    success: false,
                    message: 'No token provided',
                });
                return;
            }
            const user = await this.authService.verifyToken(token);
            if (!user) {
                res.status(401).json({
                    success: false,
                    message: 'Invalid token',
                });
                return;
            }
            res.json({
                success: true,
                data: {
                    user: {
                        id: user.id,
                        email: user.email,
                        fullName: user.fullName,
                        role: user.role,
                    },
                },
            });
        }
        catch (error) {
            res.status(401).json({
                success: false,
                message: 'Token verification failed',
            });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map