import { Router } from 'express';
import { buildGroupedRoutes, RouteGroup } from '../../../shared/utils/routeBuilder';
import { ServiceController } from '../../controllers/service.controller';
import { ServiceService } from '../../../application/services/ServiceService';
import { ServiceRepository } from '../../../infrastructure/repositories/ServiceRepository';

const router = Router();

// Gallery DI (needed first for other services)
import { GalleryController } from '../../controllers/gallery.controller';
import { GalleryService } from '../../../application/services/GalleryService';
import { GalleryRepository } from '../../../infrastructure/repositories/GalleryRepository';
import { AlbumService } from '../../../application/services/AlbumService';
import { AlbumRepository } from '../../../infrastructure/repositories/AlbumRepository';

const galleryRepository = new GalleryRepository();
const galleryService = new GalleryService(galleryRepository);
const albumRepository = new AlbumRepository();
const albumService = new AlbumService(albumRepository, galleryRepository);
const galleryController = new GalleryController(galleryService, albumService);

// Image and Feature DI (needed for services)
import { ImageRepository } from '../../../infrastructure/repositories/ImageRepository';
import { FeatureRepository } from '../../../infrastructure/repositories/FeatureRepository';

const imageRepository = new ImageRepository();
const featureRepository = new FeatureRepository();

// Dependency injection
const serviceRepository = new ServiceRepository();
const serviceService = new ServiceService(serviceRepository, imageRepository, featureRepository, galleryRepository);
const serviceController = new ServiceController(serviceService);

// Decoration DI
import { DecorationController } from '../../controllers/decoration.controller';
import { DecorationService } from '../../../application/services/DecorationService';
import { DecorationRepository } from '../../../infrastructure/repositories/DecorationRepository';

const decorationRepository = new DecorationRepository();
const decorationService = new DecorationService(decorationRepository);
const decorationController = new DecorationController(decorationService);

// Package DI
import { PackageController } from '../../controllers/package.controller';
import { PackageService } from '../../../application/services/PackageService';
import { PackageRepository } from '../../../infrastructure/repositories/PackageRepository';

const packageRepository = new PackageRepository();
const packageService = new PackageService(packageRepository);
const packageController = new PackageController(packageService);

// Product DI
import { ProductController } from '../../controllers/product.controller';
import { ProductService } from '../../../application/services/ProductService';
import { ProductRepository } from '../../../infrastructure/repositories/ProductRepository';

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

// Testimonial DI
import { TestimonialController } from '../../controllers/testimonial.controller';
import { TestimonialService } from '../../../application/services/TestimonialService';
import { TestimonialRepository } from '../../../infrastructure/repositories/TestimonialRepository';

const testimonialRepository = new TestimonialRepository();
const testimonialService = new TestimonialService(testimonialRepository);
const testimonialController = new TestimonialController(testimonialService);

// FAQ DI
import { FAQController } from '../../controllers/faq.controller';
import { FAQService } from '../../../application/services/FAQService';
import { FAQRepository } from '../../../infrastructure/repositories/FAQRepository';

const faqRepository = new FAQRepository();
const faqService = new FAQService(faqRepository);
const faqController = new FAQController(faqService);

// Consultation DI
import { ConsultationController } from '../../controllers/consultation.controller';
import { ConsultationService } from '../../../application/services/ConsultationService';
import { ConsultationRepository } from '../../../infrastructure/repositories/ConsultationRepository';

const consultationRepository = new ConsultationRepository();
const consultationService = new ConsultationService(consultationRepository);
const consultationController = new ConsultationController(consultationService);

// Order DI
import { OrderController } from '../../controllers/order.controller';
import { OrderService } from '../../../application/services/OrderService';
import { OrderRepository } from '../../../infrastructure/repositories/OrderRepository';

const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);

// Promotion DI
import { PromotionController } from '../../controllers/promotion.controller';
import { PromotionService } from '../../../application/services/PromotionService';
import { PromotionRepository } from '../../../infrastructure/repositories/PromotionRepository';

const promotionRepository = new PromotionRepository();
const promotionService = new PromotionService(promotionRepository);
const promotionController = new PromotionController(promotionService);

// Voucher DI
import { VoucherController } from '../../controllers/voucher.controller';
import { VoucherService } from '../../../application/services/VoucherService';
import { VoucherRepository } from '../../../infrastructure/repositories/VoucherRepository';
import { ChatbotController } from '../../controllers/chatbot.controller';
import { ChatbotService } from '../../../application/services/ChatbotService';
import { InvitationStyleController } from '../../controllers/invitation-style.controller';
const chatbotService = new ChatbotService(
  packageRepository,
  productRepository,
  serviceRepository,
  faqRepository,
   // Add gallery repository for images
);
const chatbotController = new ChatbotController(chatbotService);
const voucherRepository = new VoucherRepository();
const voucherService = new VoucherService(voucherRepository);
const voucherController = new VoucherController(voucherService);
const invitationStyleController = new InvitationStyleController();


// Auth DI
import { AuthController } from '../../controllers/auth.controller';
import { AuthService } from '../../../application/services/AuthService';
import { UserRepository } from '../../../infrastructure/repositories/UserRepository';

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

// Invitation DI
import { InvitationController } from '../../controllers/invitation.controller';
import { InvitationService } from '../../../application/services/InvitationService';
import { InvitationRepository } from '../../../infrastructure/repositories/InvitationRepository';
import { authenticate } from '../../middlewares/auth.middleware';

// Guest DI
import { GuestService } from '../../../application/services/GuestService';
import { GuestRepository } from '../../../infrastructure/repositories/GuestRepository';
import { GuestController } from '../../controllers/guest.controller';

const guestRepository = new GuestRepository();
const guestService = new GuestService(guestRepository);

const invitationRepository = new InvitationRepository();
const invitationService = new InvitationService(invitationRepository);
const guestController = new GuestController(guestService, invitationService);
const invitationController = new InvitationController(invitationService, guestService);

// Invitation Template DI
import { InvitationTemplateService } from '../../../application/services/InvitationTemplateService';
import { InvitationTemplateRepository } from '../../../infrastructure/repositories/InvitationTemplateRepository';
import { InvitationTemplateController } from '../../controllers/invitation-template.controller';

const templateRepository = new InvitationTemplateRepository();
const templateService = new InvitationTemplateService(templateRepository);
const templateController = new InvitationTemplateController(templateService);


// Define user route groups
const userRouteGroups: RouteGroup[] = [
  {
    basePath: '/auth',
    routes: [
      {
        method: 'post',
        path: '/login',
        handler: (req, res) => authController.login(req, res),
      },
      {
        method: 'post',
        path: '/register',
        handler: (req, res) => authController.register(req, res),
      },
      {
        method: 'post',
        path: '/verify',
        handler: (req, res) => authController.verify(req, res),
      },
    ],
  },
  {
    basePath: '/services',
    routes: [
      {
        method: 'get',
        path: '/',
        handler: (req, res) => {
          req.query.active = 'true';
          return serviceController.list(req, res);
        },
      },
      {
        method: 'get',
        path: '/slug/:slug',
        handler: (req, res) => serviceController.getBySlug(req, res),
      },
      {
        method: 'get',
        path: '/:id/images',
        handler: (req, res) => serviceController.getImages(req, res),
      },
      {
        method: 'get',
        path: '/:id',
        handler: (req, res) => serviceController.getById(req, res),
      },
    ],
  },
  {
    basePath: '/decorations',
    routes: [
      {
        method: 'get',
        path: '/',
        handler: (req, res) => {
          req.query.active = 'true';
          return decorationController.list(req, res);
        },
      },
      {
        method: 'get',
        path: '/slug/:slug',
        handler: (req, res) => decorationController.getBySlug(req, res),
      },
      {
        method: 'get',
        path: '/:id',
        handler: (req, res) => decorationController.getById(req, res),
      },
    ],
  },
  {
    basePath: '/packages',
    routes: [
      {
        method: 'get',
        path: '/',
        handler: (req, res) => {
          req.query.active = 'true';
          return packageController.list(req, res);
        },
      },
      {
        method: 'get',
        path: '/popular',
        handler: (req, res) => {
          req.query.popular = 'true';
          return packageController.list(req, res);
        },
      },
      {
        method: 'get',
        path: '/slug/:slug',
        handler: (req, res) => packageController.getBySlug(req, res),
      },
      {
        method: 'get',
        path: '/:id',
        handler: (req, res) => packageController.getById(req, res),
      },
    ],
  },
  {
    basePath: '/products',
    routes: [
      {
        method: 'get',
        path: '/',
        handler: (req, res) => {
          req.query.isActive = 'true';
          return productController.getAllProducts(req, res);
        },
      },
      {
        method: 'get',
        path: '/featured',
        handler: (req, res) => {
          req.query.isActive = 'true';
          req.query.isFeatured = 'true';
          return productController.getAllProducts(req, res);
        },
      },
      {
        method: 'get',
        path: '/category/:category',
        handler: (req, res) => {
          req.query.isActive = 'true';
          req.query.category = req.params.category;
          return productController.getAllProducts(req, res);
        },
      },
      {
        method: 'get',
        path: '/slug/:slug',
        handler: (req, res) => productController.getProductBySlug(req, res),
      },
      {
        method: 'get',
        path: '/:id',
        handler: (req, res) => productController.getProductById(req, res),
      },
    ],
  },
  {
    basePath: '/galleries',
    routes: [
      {
        method: 'get',
        path: '/',
        handler: (req, res) => {
          req.query.isActive = 'true';
          return galleryController.getAllGalleries(req, res);
        },
      },
      {
        method: 'get',
        path: '/albums',
        handler: (req, res) => {
          req.query.isActive = 'true';
          return galleryController.getAllAlbums(req, res);
        },
      },
      {
        method: 'get',
        path: '/albums/:id',
        handler: (req, res) => galleryController.getAlbumById(req, res),
      },
      {
        method: 'get',
        path: '/albums/:albumId/images',
        handler: (req, res) => galleryController.getImagesByAlbum(req, res),
      },
      {
        method: 'get',
        path: '/:id',
        handler: (req, res) => galleryController.getGalleryById(req, res),
      },
      {
        method: 'get',
        path: '/related/:relatedType/:relatedId',
        handler: (req, res) => galleryController.getGalleriesByRelated(req, res),
      },
      {
        method: 'get',
        path: '/primary/:relatedType/:relatedId',
        handler: (req, res) => galleryController.getPrimaryImage(req, res),
      },
    ],
  },
  {
    basePath: '/testimonials',
    routes: [
      {
        method: 'get',
        path: '/',
        handler: (req, res) => testimonialController.getActiveTestimonials(req, res),
      },
      {
        method: 'get',
        path: '/language/:language',
        handler: (req, res) => testimonialController.getTestimonialsByLanguage(req, res),
      },
      {
        method: 'get',
        path: '/:id',
        handler: (req, res) => testimonialController.getTestimonialById(req, res),
      },
      {
        method: 'post',
        path: '/submit',
        handler: (req, res) => testimonialController.submitTestimonial(req, res),
      },
    ],
  },
  {
    basePath: '/faqs',
    routes: [
      {
        method: 'get',
        path: '/',
        handler: (req, res) => faqController.getActiveFAQs(req, res),
      },
      {
        method: 'get',
        path: '/category/:category',
        handler: (req, res) => faqController.getFAQsByCategory(req, res),
      },
      {
        method: 'get',
        path: '/language/:language',
        handler: (req, res) => faqController.getFAQsByLanguage(req, res),
      },
      {
        method: 'get',
        path: '/category/:category/language/:language',
        handler: (req, res) => faqController.getFAQsByCategoryAndLanguage(req, res),
      },
      {
        method: 'get',
        path: '/:id',
        handler: (req, res) => faqController.getFAQById(req, res),
      },
    ],
  },
  {
    basePath: '/consultations',
    routes: [
      {
        method: 'post',
        path: '/',
        handler: (req, res) => consultationController.bookConsultation(req, res),
      },
      {
        method: 'get',
        path: '/email/:email',
        handler: (req, res) => consultationController.getConsultationsByEmail(req, res),
      },
      {
        method: 'get',
        path: '/:id',
        handler: (req, res) => consultationController.getConsultationById(req, res),
      },
    ],
  },
  {
    basePath: '/promotions',
    routes: [
      {
        method: 'get',
        path: '/code/:code',
        handler: (req, res) => promotionController.getByCode(req, res),
      },
    ],
  },
  {
    basePath: '/vouchers',
    routes: [
      {
        method: 'post',
        path: '/validate',
        handler: (req, res) => voucherController.validateVoucher(req, res),
      },
      {
        method: 'get',
        path: '/active',
        handler: (req, res) => voucherController.getActiveVouchers(req, res),
      },
      {
        method: 'get',
        path: '/:code',
        handler: (req, res) => voucherController.getVoucherByCode(req, res),
      },
    ],
  },
  {
    basePath: '/orders',
    routes: [
      {
        method: 'post',
        path: '/',
        handler: (req, res) => orderController.createOrder(req, res),
      },
      {
        method: 'post' ,
        path: '/apply-voucher',
        handler: (req, res) => orderController.applyVoucher(req, res),
      },
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
    ],
  },
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
  {
    basePath: '/invitation-style',
    routes: [
      {
        method: 'get',
        path: '/',
        handler: (req, res) => invitationStyleController.getDefaultStyle(req, res),
      },
      {
        method: 'get',
        path: '/default',
        handler: (req, res) => invitationStyleController.getDefaultStyle(req, res),
      },
    ],
  },
  {
    basePath: '/invitation-templates',
    routes: [
      {
        method: 'get',
        path: '/',
        handler: (req, res) => templateController.getAllTemplates(req, res),
      },
      {
        method: 'get',
        path: '/:id',
        handler: (req, res) => templateController.getTemplateById(req, res),
      },
    ],
  },
 
  {
    basePath: '/invitations',
    routes: [
      {
        method: 'get',
        path: '/',
        handler: async (req, res) => {
          await authenticate(req, res, () => invitationController.getUserInvitations(req, res));
        },
      },
      {
        method: 'get',
        path: '/share/:shareUrl',
        handler: (req, res) => invitationController.getInvitationByShareUrl(req, res),
      },
      {
        method: 'get',
        path: '/slug/:slug',
        handler: (req, res) => invitationController.getInvitationBySlug(req, res),
      },
      {
        method: 'get',
        path: '/:id',
        handler: async (req, res) => {
          await authenticate(req, res, () => invitationController.getInvitationById(req, res));
        },
      },
      {
        method: 'post',
        path: '/',
        handler: async (req, res) => {
          await authenticate(req, res, () => invitationController.createInvitation(req, res));
        },
      },
      {
        method: 'put',
        path: '/:id',
        handler: async (req, res) => {
          await authenticate(req, res, () => invitationController.updateInvitation(req, res));
        },
      },
      {
        method: 'delete',
        path: '/:id',
        handler: async (req, res) => {
          await authenticate(req, res, () => invitationController.deleteInvitation(req, res));
        },
      },
    ],
  },

  // Route alias với số ít để tương thích
  {
    basePath: '/invitation',
    routes: [
      {
        method: 'get',
        path: '/share/:shareUrl',
        handler: (req, res) => invitationController.getInvitationByShareUrl(req, res),
      },
      {
        method: 'get',
        path: '/slug/:slug',
        handler: (req, res) => invitationController.getInvitationBySlug(req, res),
      },
      {
        method: 'get',
        path: '/:id',
        handler: async (req, res) => {
          await authenticate(req, res, () => invitationController.getInvitationById(req, res));
        },
      },
    ],
  },

  {
    basePath: '/guests',
    routes: [
      {
        method: 'get',
        path: '/',
        handler: (req, res) => guestController.getAllGuests(req, res),
      },
      {
        method: 'get',
        path: '/invitation/:invitationId',
        handler: (req, res) => guestController.getGuestsByInvitationId(req, res),
      },
      {
        method: 'get',
        path: '/share/:shareUrl',
        handler: (req, res) => guestController.getGuestsByShareUrl(req, res),
      },
      {
        method: 'post',
        path: '/invitation/:invitationId',
        handler: async (req, res) => {
          await authenticate(req, res, () => guestController.createGuest(req, res));
        },
      },
      {
        method: 'post',
        path: '/share/:shareUrl',
        handler: async (req, res) => {
          await authenticate(req, res, () => guestController.createGuestByShareUrl(req, res));
        },
      },
      {
        method: 'put',
        path: '/:id',
        handler: (req, res) => guestController.updateGuest(req, res),
      },
      {
        method: 'delete',
        path: '/:id',
        handler: (req, res) => guestController.deleteGuest(req, res),
      },
    ],
  },
  
];

// Build grouped routes
buildGroupedRoutes(router, userRouteGroups);

export default router;
