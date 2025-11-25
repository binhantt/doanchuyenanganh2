"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, email, password, fullName, phone, role, isActive = true, emailVerifiedAt = null, createdAt, updatedAt) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.phone = phone;
        this.role = role;
        this.isActive = isActive;
        this.emailVerifiedAt = emailVerifiedAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    isAdmin() {
        return this.role === 'admin';
    }
    isStaff() {
        return this.role === 'staff';
    }
    isVerified() {
        return this.emailVerifiedAt !== null;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map