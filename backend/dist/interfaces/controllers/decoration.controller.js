"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecorationController = void 0;
class DecorationController {
    constructor(decorationService) {
        this.decorationService = decorationService;
    }
    async list(req, res) {
        try {
            const onlyActive = req.query.active === 'true';
            const theme = req.query.theme;
            const style = req.query.style;
            let decorations;
            if (theme) {
                decorations = await this.decorationService.getDecorationsByTheme(theme);
            }
            else if (style) {
                decorations = await this.decorationService.getDecorationsByStyle(style);
            }
            else {
                decorations = await this.decorationService.getAllDecorations(onlyActive);
            }
            return res.status(200).json({
                success: true,
                data: decorations,
                count: decorations.length,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
            });
        }
    }
    async getById(req, res) {
        try {
            const { id } = req.params;
            const decoration = await this.decorationService.getDecorationById(id);
            if (!decoration) {
                return res.status(404).json({
                    success: false,
                    message: 'Decoration not found',
                });
            }
            return res.status(200).json({
                success: true,
                data: decoration,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
            });
        }
    }
    async getBySlug(req, res) {
        try {
            const { slug } = req.params;
            const decoration = await this.decorationService.getDecorationBySlug(slug);
            if (!decoration) {
                return res.status(404).json({
                    success: false,
                    message: 'Decoration not found',
                });
            }
            return res.status(200).json({
                success: true,
                data: decoration,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
            });
        }
    }
    async create(req, res) {
        try {
            const input = req.body;
            const decoration = await this.decorationService.createDecoration(input);
            return res.status(201).json({
                success: true,
                data: decoration,
                message: 'Decoration created successfully',
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
            });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const input = req.body;
            const decoration = await this.decorationService.updateDecoration(id, input);
            if (!decoration) {
                return res.status(404).json({
                    success: false,
                    message: 'Decoration not found',
                });
            }
            return res.status(200).json({
                success: true,
                data: decoration,
                message: 'Decoration updated successfully',
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
            });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await this.decorationService.deleteDecoration(id);
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Decoration not found',
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Decoration deleted successfully',
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Internal server error',
            });
        }
    }
}
exports.DecorationController = DecorationController;
//# sourceMappingURL=decoration.controller.js.map