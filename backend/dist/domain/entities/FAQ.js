"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAQ = void 0;
class FAQ {
    constructor(id, question, answer, category, language, displayOrder, isActive = true, createdAt, updatedAt) {
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.category = category;
        this.language = language;
        this.displayOrder = displayOrder;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    isVisible() {
        return this.isActive;
    }
}
exports.FAQ = FAQ;
//# sourceMappingURL=FAQ.js.map