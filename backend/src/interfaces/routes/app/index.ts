import { Router } from 'express';
import { OrderController } from '../../controllers/order.controller';
import { OrderService } from '../../../application/services/OrderService';
import { OrderRepository } from '../../../infrastructure/repositories/OrderRepository';
import { PackageController } from '../../controllers/package.controller';
import { PackageService } from '../../../application/services/PackageService';
import { PackageRepository } from '../../../infrastructure/repositories/PackageRepository';
import { ProductController } from '../../controllers/product.controller';
import { ProductService } from '../../../application/services/ProductService';
import { ProductRepository } from '../../../infrastructure/repositories/ProductRepository';
import { GalleryController } from '../../controllers/gallery.controller';
import { GalleryService } from '../../../application/services/GalleryService';
import { GalleryRepository } from '../../../infrastructure/repositories/GalleryRepository';
import { TestimonialController } from '../../controllers/testimonial.controller';
import { TestimonialService } from '../../../application/services/TestimonialService';
import { TestimonialRepository } from '../../../infrastructure/repositories/TestimonialRepository';
import { buildGroupedRoutes, RouteGroup } from '../../../shared/utils/routeBuilder';

const router = Router();

// Initialize Order dependencies
const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);

// Initialize Package dependencies
const packageRepository = new PackageRepository();
const packageService = new PackageService(packageRepository);
const packageController = new PackageController(packageService);

// Initialize Product dependencies
const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

// Initialize Gallery dependencies
const galleryRepository = new GalleryRepository();
const galleryService = new GalleryService(galleryRepository);
const galleryController = new GalleryController(galleryService);

// Initialize Testimonial dependencies
const testimonialRepository = new TestimonialRepository();
const testimonialService = new TestimonialService(testimonialRepository);
const testimonialController = new TestimonialController(testimonialService);

// Initialize Chatbot dependencies
import { ChatbotController } from '../../controllers/chatbot.controller';
import { ChatbotService } from '../../../application/services/ChatbotService';
import { FAQRepository } from '../../../infrastructure/repositories/FAQRepository';
import { ServiceRepository } from '../../../infrastructure/repositories/ServiceRepository';

const faqRepository = new FAQRepository();
const serviceRepository = new ServiceRepository();
const chatbotService = new ChatbotService(
  packageRepository,
  productRepository,
  serviceRepository,
  faqRepository,
   // Add gallery repository for images
);
const chatbotController = new ChatbotController(chatbotService);

// App API routes
const APP: RouteGroup[] = [
  // Auth & Orders
  {
    basePath: '/auth',
    routes: [
      {
        method: 'post',
        path: '/verify',
        handler: (req, res) => orderController.verifyOrder(req, res),
      },
      {
        method: 'post',
        path: '/register',
        handler: (req, res) => orderController.registerOrder(req, res),
      },
    ],
  },
  {
    basePath: '/orders',
    routes: [
      {
        method: 'get',
        path: '/email/:email',
        handler: (req, res) => orderController.getOrdersByEmail(req, res),
      },
      {
        method: 'get',
        path: '/:id',
        handler: (req, res) => orderController.getOrderById(req, res),
      },
      {
        method: 'post',
        path: '/',
        handler: (req, res) => orderController.createOrder(req, res),
      },
      {
        method: 'post',
        path: '/apply-voucher',
        handler: (req, res) => orderController.applyVoucher(req, res),
      },
    ],
  },
  // Packages
  {
    basePath: '/packages',
    routes: [
      {
        method: 'get',
        path: '/',
        handler: (req, res) => packageController.getAllPackages(req, res),
      },
      {
        method: 'get',
        path: '/:id',
        handler: (req, res) => packageController.getPackageById(req, res),
      },
    ],
  },
  // Products
  {
    basePath: '/products',
    routes: [
      {
        method: 'get',
        path: '/',
        handler: (req, res) => productController.getAllProducts(req, res),
      },
      {
        method: 'get',
        path: '/:id',
        handler: (req, res) => productController.getProductById(req, res),
      },
      {
        method: 'get',
        path: '/category/:category',
        handler: (req, res) => productController.getProductsByCategory(req, res),
      },
    ],
  },
  // Gallery
  {
    basePath: '/gallery',
    routes: [
      {
        method: 'get',
        path: '/',
        handler: (req, res) => galleryController.getAllGalleries(req, res),
      },
      {
        method: 'get',
        path: '/:id',
        handler: (req, res) => galleryController.getGalleryById(req, res),
      },
    ],
  },
  // Testimonials
  {
    basePath: '/testimonials',
    routes: [
      {
        method: 'get',
        path: '/',
        handler: (req, res) => testimonialController.getAllTestimonials(req, res),
      },
    ],
  },
  // Chatbot
  {
    basePath: '/chatbot',
    routes: [
      {
        method: 'post',
        path: '/chat',
        handler: (req, res) => chatbotController.sendMessage(req, res),
      },
      {
        method: 'get',
        path: '/quick-replies',
        handler: (req, res) => chatbotController.getQuickReplies(req, res),
      },
      {
        method: 'get',
        path: '/info',
        handler: (req, res) => chatbotController.getInfo(req, res),
      },
      {
        method: 'post',
        path: '/order',
        handler: (req, res) => chatbotController.createOrder(req, res),
      },
    ],
  },
];

buildGroupedRoutes(router, APP);

export default router;
