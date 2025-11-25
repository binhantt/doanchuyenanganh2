"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getAllUsers(filters) {
        const users = await this.userRepository.findAll(filters);
        return users.map(this.excludePassword);
    }
    async getUserById(id) {
        const user = await this.userRepository.findById(id);
        return user ? this.excludePassword(user) : null;
    }
    async getUserByEmail(email) {
        return this.userRepository.findByEmail(email);
    }
    async createUser(data) {
        // Check if email already exists
        const existing = await this.userRepository.findByEmail(data.email);
        if (existing) {
            throw new Error('Email already exists');
        }
        // Hash password
        const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
        const user = await this.userRepository.create({
            ...data,
            password: hashedPassword,
        });
        return this.excludePassword(user);
    }
    async updateUser(id, data) {
        const existing = await this.userRepository.findById(id);
        if (!existing) {
            return null;
        }
        // If updating email, check uniqueness
        if (data.email && data.email !== existing.email) {
            const emailExists = await this.userRepository.findByEmail(data.email);
            if (emailExists) {
                throw new Error('Email already exists');
            }
        }
        // Create update data object
        const updateData = { ...data };
        // If updating password, hash it
        if (updateData.password) {
            updateData.password = await bcrypt_1.default.hash(updateData.password, 10);
        }
        const updated = await this.userRepository.update(id, updateData);
        return updated ? this.excludePassword(updated) : null;
    }
    async deleteUser(id) {
        return this.userRepository.delete(id);
    }
    async toggleUserStatus(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            return null;
        }
        const updated = await this.userRepository.update(id, {
            isActive: !user.isActive,
        });
        return updated ? this.excludePassword(updated) : null;
    }
    excludePassword(user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map