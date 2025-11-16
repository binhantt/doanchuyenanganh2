# 🎀 Pink Theme Guide - Wedding Admin Panel

## 🎨 Bảng màu chính

### Primary Colors
```css
--pink-primary: #FF4D8A    /* Màu hồng chính */
--pink-light: #FFB3CF      /* Màu hồng nhạt */
--pink-soft: #FFF0F6       /* Màu hồng mềm (background) */
--pink-dark: #D93672       /* Màu hồng đậm */
--pink-shadow: #FFD9E6     /* Màu hồng bóng */
```

### Gradients
```css
/* Primary Gradient */
background: linear-gradient(135deg, #FF4D8A 0%, #FF6B9D 100%);

/* Soft Gradient */
background: linear-gradient(135deg, #FFF0F6 0%, #FFE5F0 100%);

/* Dark Gradient */
background: linear-gradient(135deg, #D93672 0%, #FF4D8A 100%);
```

## 🎯 Components đã được style

### ✅ Ant Design Components
- **Buttons** - Primary, Link, Ghost
- **Menu** - Selected, Hover states
- **Switch** - Checked state
- **Input** - Focus, Hover states
- **Select** - Focus, Selected options
- **Pagination** - Active page
- **Table** - Header, Hover rows
- **Checkbox & Radio** - Checked states
- **Modal** - Header gradient
- **Tabs** - Active tab
- **Badge** - Pink background
- **Tag** - Pink variant
- **Progress** - Pink bar
- **Slider** - Pink track
- **DatePicker** - Selected date
- **Upload** - Hover state
- **Dropdown** - Selected items
- **Card** - Header gradient
- **Statistic** - Pink values

### ✅ Custom Components
- **PinkCard** - Card với theme hồng
- **BaseButton** - Button với gradient
- **BaseInput** - Input với pink focus
- **BaseSelect** - Select với pink theme
- **All Modals** - Modal với pink header

## 💅 Custom CSS Classes

### Gradient Classes
```html
<!-- Gradient Background -->
<div class="pink-gradient-bg">Content</div>

<!-- Gradient Text -->
<h1 class="pink-gradient-text">Title</h1>
```

### Shadow Classes
```html
<!-- Pink Shadow -->
<div class="pink-shadow">Card</div>
```

### Border Classes
```html
<!-- Pink Border -->
<div class="pink-border">Box</div>
```

### Animation Classes
```html
<!-- Pink Pulse Animation -->
<button class="pink-pulse">Click me</button>
```

## 🎨 Sử dụng trong Tailwind

### Background Colors
```html
<div class="bg-pinkPrimary">Primary</div>
<div class="bg-pinkLight">Light</div>
<div class="bg-pinkSoft">Soft</div>
<div class="bg-pinkDark">Dark</div>
<div class="bg-pinkShadow">Shadow</div>
```

### Text Colors
```html
<p class="text-pinkPrimary">Primary text</p>
<p class="text-pinkDark">Dark text</p>
```

### Border Colors
```html
<div class="border-2 border-pinkPrimary">Box</div>
```

## 📦 Component Examples

### Pink Card
```vue
<pink-card 
  title="Card Title" 
  :icon="HeartFilled"
  hoverable
  gradient
>
  Card content here
</pink-card>
```

### Pink Button
```vue
<a-button type="primary" class="pink-pulse">
  Click me
</a-button>
```

### Pink Statistic
```vue
<a-statistic
  title="Total"
  :value="1234"
  :value-style="{ color: '#FF4D8A', fontWeight: 'bold' }"
/>
```

## 🎯 Pages với Pink Theme

### ✅ Login Page
- Gradient background
- Decorative circles
- Heart icon
- Pink shadow card
- Gradient divider

### ✅ Dashboard
- Pink gradient title
- Hoverable cards
- Pink statistics
- Gradient backgrounds
- Pink pulse button

### ✅ Category Management
- Pink gradient title
- Pink shadow cards
- Pink table headers
- Pink pagination

## 🔧 Customization

### Thay đổi màu chính

1. **Trong Tailwind Config**
```js
// tailwind.config.js
colors: {
  pinkPrimary: '#YOUR_COLOR',
  // ...
}
```

2. **Trong CSS**
```css
/* main.css */
.ant-btn-primary {
  background-color: #YOUR_COLOR !important;
}
```

3. **Trong Theme Config**
```ts
// src/config/theme.ts
export const pinkTheme = {
  colors: {
    primary: '#YOUR_COLOR',
    // ...
  }
}
```

## 🎨 Design Principles

### 1. Consistency
- Sử dụng cùng một bảng màu
- Gradient nhất quán
- Shadow nhất quán

### 2. Hierarchy
- Primary: #FF4D8A
- Secondary: #D93672
- Accent: #FFB3CF

### 3. Accessibility
- Contrast ratio đủ cao
- Hover states rõ ràng
- Focus states dễ nhận biết

### 4. Animations
- Smooth transitions (0.3s)
- Subtle hover effects
- Pulse animations cho CTAs

## 📱 Responsive

Theme hoạt động tốt trên mọi kích thước màn hình:
- Mobile: Đầy đủ màu sắc
- Tablet: Gradient mượt mà
- Desktop: Full effects

## 🌟 Best Practices

1. **Sử dụng gradient cho CTAs quan trọng**
```vue
<a-button type="primary" class="pink-pulse">
  Important Action
</a-button>
```

2. **Sử dụng soft colors cho backgrounds**
```html
<div class="bg-pinkSoft">
  Content area
</div>
```

3. **Sử dụng dark colors cho text quan trọng**
```html
<h1 class="text-pinkDark font-bold">
  Important Title
</h1>
```

4. **Sử dụng shadows cho depth**
```html
<div class="pink-shadow">
  Elevated card
</div>
```

## 🎉 Kết quả

Theme màu hồng đã được áp dụng toàn bộ:
- ✅ Tất cả Ant Design components
- ✅ Custom components
- ✅ Pages và layouts
- ✅ Animations và transitions
- ✅ Responsive design
- ✅ Accessibility compliant

## 💡 Tips

1. Kết hợp gradient với shadow để tạo depth
2. Sử dụng hover effects để tăng interactivity
3. Áp dụng animations tinh tế
4. Giữ consistency trong toàn bộ app
5. Test trên nhiều devices

## 🔗 Resources

- Tailwind Config: `tailwind.config.js`
- CSS Overrides: `src/assets/main.css`
- Theme Config: `src/config/theme.ts`
- Components: `src/components/common/`

---

**Enjoy your beautiful pink-themed admin panel! 💕**
