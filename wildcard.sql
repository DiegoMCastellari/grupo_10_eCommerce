-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-02-2021 a las 23:00:11
-- Versión del servidor: 10.4.13-MariaDB
-- Versión de PHP: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `wildcard`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carritos`
--

CREATE TABLE `carritos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `forma_pago` varchar(50) DEFAULT NULL,
  `forma_envio` varchar(50) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `carritos`
--

INSERT INTO `carritos` (`id`, `id_usuario`, `estado`, `forma_pago`, `forma_envio`, `createdAt`, `updatedAt`) VALUES
(16, 2, 'cerrado', '1', '1', '2021-01-13 14:58:32', '2021-01-15 15:32:39'),
(17, 2, 'pedido', '1', '1', '2021-01-13 14:58:57', '2021-01-14 23:22:26'),
(18, 2, 'pedido', '2', '1', '2021-01-14 23:23:04', '2021-01-26 22:47:34'),
(19, 2, 'pedido', '1', '1', '2021-01-26 22:47:50', '2021-01-27 19:37:19'),
(20, 2, 'pedido', '1', '1', '2021-01-27 19:37:32', '2021-01-27 19:54:54'),
(21, 2, 'pedido', '1', '1', '2021-01-27 19:56:00', '2021-01-28 18:00:13'),
(22, 2, 'pedido', '1', '1', '2021-01-28 18:00:50', '2021-02-03 22:59:20'),
(23, 2, 'pedido', '1', '1', '2021-02-03 22:59:42', '2021-02-03 23:01:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito_producto`
--

CREATE TABLE `carrito_producto` (
  `id` int(11) NOT NULL,
  `id_carrito` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_talle` int(11) NOT NULL,
  `id_color` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `subtotal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `carrito_producto`
--

INSERT INTO `carrito_producto` (`id`, `id_carrito`, `id_producto`, `id_usuario`, `id_talle`, `id_color`, `cantidad`, `subtotal`) VALUES
(28, 16, 57, 2, 1, 2, 1, 3000),
(29, 16, 58, 2, 3, 2, 8, 2000),
(32, 17, 59, 2, 5, 7, 3, 5000),
(34, 17, 59, 2, 7, 6, 4, 4000),
(35, 18, 54, 2, 1, 1, 4, 3535),
(40, 18, 54, 2, 2, 2, 1, 1568),
(42, 18, 57, 2, 1, 2, 1, 2535),
(43, 19, 57, 2, 2, 3, 1, 150),
(45, 19, 63, 2, 1, 3, 5, 2354),
(46, 20, 54, 2, 1, 1, 3, 2535),
(47, 20, 57, 2, 6, 3, 4, 6352),
(49, 21, 54, 2, 2, 2, 5, 2547),
(50, 21, 57, 2, 6, 3, 4, 7227),
(51, 21, 54, 2, 1, 1, 5, 2547),
(52, 22, 54, 2, 1, 2, 2, 4500),
(54, 22, 57, 2, 2, 3, 4, 4900),
(55, 22, 56, 2, 8, 8, 1, 40000),
(56, 23, 63, 2, 2, 3, 8, 2700),
(57, 23, 63, 2, 3, 2, 3, 2700);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`) VALUES
(1, 'Zapatillas'),
(2, 'Botas'),
(3, 'Zapatos'),
(4, 'Suecos'),
(5, 'Sandalias'),
(6, 'Chatas'),
(7, 'Ojotas'),
(8, 'Carteras'),
(9, 'Pañuelos'),
(10, 'Pulseras y collares'),
(11, 'Cintos'),
(12, 'Mochilas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `colores`
--

CREATE TABLE `colores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `hex` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `colores`
--

INSERT INTO `colores` (`id`, `nombre`, `hex`) VALUES
(1, 'Blanco', 'FFFFFF'),
(2, 'Negro', '000000'),
(3, 'Gris', '9b9b9b'),
(4, 'Rojo', 'FF0000'),
(5, 'Azul', '0000ff'),
(6, 'Amarillo', 'FFFF00'),
(7, 'Verde', '008f39'),
(8, 'Marron', '804000'),
(9, 'Beige', 'f5f5dc');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `id_producto` int(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`id`, `nombre`, `path`, `id_producto`) VALUES
(3, 'Imagen1-1605734162395.jpg', 'Imagen1-1609623390649.jpg', 54),
(4, 'Imagen1-1605735229248.jpg', 'Imagen2-1609623390651.jpg', 54),
(5, 'Imagen1-1605898137806.jpg', 'Imagen3-1609623390700.jpg', 54),
(6, 'Imagen1-1605737234435.jpg', 'Imagen4-1609623390711.jpg', 54),
(7, 'Imagen1-1605737234435.jpg', 'Imagen1-1609623531966.jpg', 55),
(8, 'Imagen3-1605643518256.jpg', 'Imagen2-1609623531967.jpg', 55),
(9, 'Imagen4-1605643582854.jpg', 'Imagen3-1609623531984.jpg', 55),
(10, 'Imagen1-1605646377650.jpg', 'Imagen4-1609623532008.jpg', 55),
(11, 'img-macbook-pro-2019.jpg', 'Imagen1-1612219195244.jpg', 56),
(12, 'img-macbook-pro-2019.jpg', 'Imagen1-1612219195244.jpg', 56),
(13, 'img-macbook-pro-2019.jpg', 'Imagen1-1612219195244.jpg', 56),
(14, 'img-macbook-pro-2019.jpg', 'Imagen1-1612219195244.jpg', 56),
(15, 'Imagen2-1609623390651.jpg', 'Imagen1-1609625062770.jpg', 57),
(16, 'Imagen2-1606258320279.jpg', 'Imagen3-1609625062773.jpg', 57),
(17, 'Imagen2-1606256193681.jpg', 'Imagen1-1609630353762.jpg', 58),
(18, 'Imagen3-1606256193684.jpg', 'Imagen2-1609630353765.jpg', 58),
(19, 'Imagen6-1605643582859.jpg', 'Imagen3-1609630353767.jpg', 58),
(20, 'Imagen2-1609630353765.jpg', 'Imagen1-1609630478824.jpg', 59),
(21, 'Imagen1-1605737234435.jpg', 'Imagen2-1609630478827.jpg', 59),
(22, 'Imagen1-1605734677718.jpg', 'Imagen3-1609630478828.jpg', 59),
(25, 'Imagen1-1605647953949.jpg', 'Imagen1-1609785495283.jpg', 61),
(26, 'Imagen1-1605736631857.jpg', 'Imagen2-1609785495323.jpg', 61),
(27, 'Imagen1-1605647953949.jpg', 'Imagen3-1609785495379.jpg', 61),
(28, 'Imagen1-1605647953949.jpg', 'Imagen1-1609785504220.jpg', 62),
(29, 'Imagen1-1605736631857.jpg', 'Imagen2-1609785504221.jpg', 62),
(30, 'Imagen1-1605647953949.jpg', 'Imagen3-1609785504223.jpg', 62),
(31, 'Imagen1-1605898326691.jpg', 'Imagen1-1609788810887.jpg', 63);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marcas`
--

CREATE TABLE `marcas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `marcas`
--

INSERT INTO `marcas` (`id`, `nombre`) VALUES
(1, 'Nike'),
(2, 'Wildcard'),
(3, 'Puma'),
(5, 'DC'),
(6, 'Texas Maiden'),
(7, 'Popis'),
(15, 'Topper'),
(38, 'Adidas'),
(39, 'Pony');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `precio` int(11) NOT NULL,
  `descuento` int(11) DEFAULT NULL,
  `id_tipo` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `descripcion` varchar(1000) DEFAULT NULL,
  `usuario` varchar(40) NOT NULL,
  `id_marca` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `activo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `precio`, `descuento`, `id_tipo`, `id_categoria`, `descripcion`, `usuario`, `id_marca`, `createdAt`, `updatedAt`, `activo`) VALUES
(54, 'ZANDALIAS', 5000, 10, 0, 5, 'Zandalias para verano', 'mujer', 1, '2021-01-02 21:36:30', '2021-02-02 21:24:09', 1),
(55, 'BOTIN', 20000, 12, 1, 2, 'Botin de trabajo', 'hombre', 2, '2021-01-02 21:38:52', '2021-01-09 19:13:51', 1),
(56, 'Mochila PR', 40000, 0, 0, 12, 'Mochila PR', 'mujer', 5, '2021-01-02 21:40:08', '2021-02-02 21:24:12', 1),
(57, 'Botas', 7000, 30, 0, 2, 'Botas  de cuero ecologico.', 'mujer', 3, '2021-01-02 22:04:22', '2021-02-02 21:32:12', 1),
(58, 'OJOTAS', 1500, 0, 1, 7, 'Ojotas de goma con suela antideslizante', 'mujer', 5, '2021-01-02 23:32:33', '2021-01-09 19:13:55', 1),
(59, 'OJOTAS DE VESTIR', 9000, 15, 0, 7, 'asdasd', 'mujer', 2, '2021-01-02 23:34:38', '2021-02-02 21:27:21', 1),
(61, 'Botas', 8000, 0, 1, 2, 'Botas color negro de cuero ecologico.', 'mujer', 3, '2021-01-04 18:38:15', '2021-01-09 19:13:56', 1),
(62, 'Botas', 8000, 0, 1, 2, 'Botas color negro de cuero ecologico.', 'mujer', 3, '2021-01-04 18:38:24', '2021-01-04 18:38:24', 1),
(63, 'Botines', 3000, 10, 1, 3, 'Botines de seguridad', 'mujer', 5, '2021-01-04 19:33:30', '2021-01-09 18:31:34', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_color`
--

CREATE TABLE `producto_color` (
  `id` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `id_color` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producto_color`
--

INSERT INTO `producto_color` (`id`, `id_producto`, `id_color`) VALUES
(69, 54, 1),
(70, 54, 2),
(71, 54, 3),
(72, 55, 1),
(73, 55, 3),
(74, 55, 7),
(75, 55, 9),
(76, 56, 8),
(77, 56, 8),
(78, 56, 8),
(79, 56, 8),
(80, 56, 8),
(81, 57, 2),
(82, 57, 3),
(83, 58, 4),
(84, 58, 2),
(85, 59, 5),
(86, 59, 6),
(87, 59, 7),
(88, 59, 8),
(93, 61, 2),
(94, 61, 3),
(95, 62, 2),
(96, 62, 3),
(97, 63, 2),
(98, 63, 3),
(99, 63, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_talle`
--

CREATE TABLE `producto_talle` (
  `id` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `id_talle` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producto_talle`
--

INSERT INTO `producto_talle` (`id`, `id_producto`, `id_talle`) VALUES
(95, 54, 1),
(96, 54, 2),
(97, 54, 3),
(98, 54, 4),
(99, 55, 4),
(100, 55, 5),
(101, 55, 6),
(102, 55, 7),
(103, 56, 8),
(104, 56, 8),
(105, 56, 8),
(106, 57, 1),
(107, 57, 2),
(108, 57, 3),
(109, 57, 4),
(110, 57, 5),
(111, 57, 6),
(112, 58, 4),
(113, 58, 5),
(114, 59, 3),
(115, 59, 4),
(116, 59, 5),
(117, 59, 6),
(118, 59, 7),
(124, 61, 2),
(125, 61, 9),
(126, 61, 4),
(127, 62, 4),
(128, 62, 9),
(129, 62, 2),
(130, 63, 1),
(131, 63, 2),
(132, 63, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stocks`
--

CREATE TABLE `stocks` (
  `id` int(11) NOT NULL,
  `id_talle` int(11) NOT NULL,
  `id_color` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `stocks`
--

INSERT INTO `stocks` (`id`, `id_talle`, `id_color`, `stock`, `id_producto`) VALUES
(11, 1, 2, 4, 63),
(12, 1, 3, 0, 63),
(13, 1, 7, 0, 63),
(14, 2, 2, 5, 63),
(15, 2, 3, 0, 63),
(16, 2, 7, 0, 63),
(19, 3, 7, 7, 63),
(27, 3, 2, 2, 63),
(28, 1, 1, 1, 54),
(29, 1, 2, 1, 54),
(30, 1, 3, 1, 54),
(31, 2, 1, 1, 54),
(32, 2, 2, 1, 54),
(33, 2, 3, 1, 54),
(34, 3, 1, 1, 54),
(35, 3, 2, 1, 54),
(36, 3, 3, 1, 54),
(37, 4, 1, 1, 54),
(38, 4, 2, 1, 54),
(39, 4, 3, 1, 54),
(40, 4, 7, 1, 55),
(41, 4, 3, 1, 55),
(42, 4, 9, 1, 55),
(43, 5, 1, 1, 55),
(44, 4, 1, 1, 55),
(45, 5, 3, 0, 55),
(46, 5, 7, 1, 55),
(47, 5, 9, 0, 55),
(48, 6, 1, 1, 55),
(49, 6, 3, 0, 55),
(50, 6, 7, 1, 55),
(51, 6, 9, 0, 55),
(52, 7, 1, 1, 55),
(53, 7, 3, 0, 55),
(54, 7, 7, 1, 55),
(55, 7, 9, 1, 55);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `talles`
--

CREATE TABLE `talles` (
  `id` int(11) NOT NULL,
  `talle` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `talles`
--

INSERT INTO `talles` (`id`, `talle`) VALUES
(1, '34'),
(2, '35'),
(3, '36'),
(4, '37'),
(5, '38'),
(6, '39'),
(7, '40'),
(8, '41'),
(9, '42'),
(10, '43'),
(11, '44'),
(12, '45'),
(16, 'Large'),
(15, 'Medium'),
(14, 'Small'),
(17, 'X-Large'),
(13, 'X-Small');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos`
--

CREATE TABLE `tipos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipos`
--

INSERT INTO `tipos` (`id`, `nombre`) VALUES
(1, 'Calzado'),
(2, 'Accesorio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` int(20) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `permiso` varchar(50) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `telefono`, `password`, `permiso`, `createdAt`, `updatedAt`) VALUES
(1, 'DiegoMC', 'diego@diego.com', 2345246, '$2b$10$2BvXF7Ip9RtbvWv8vwpDFuTWVxxvt0pdsUSQFKtCi/k7Y5pS5E3Uu', 'externo', '2020-12-22 19:25:42', '2020-12-22 19:25:42'),
(2, 'David Donati', 'daviddonati730@gmail.com', 2147483647, '$2b$10$ohfbEO42eGnct6W5i4TN..xzzv7o1VrAj7DE7vs2Y5eXOSzEPZMbS', 'admin', '2021-01-06 13:21:34', '2021-01-11 23:34:00'),
(3, 'Pepe', 'pepe@pepe.gmail', 800346231, '$2b$10$hhkEJcIprkxGGMJg0ebCjeZFRT/F.IrMrf8r58sXNbjkckCksUale', 'admin', '2021-01-09 17:24:59', '2021-01-13 15:52:28'),
(6, 'Jose Perez', 'perez@gmail.com', 800346231, '$2b$10$oFvUOfhKMwXy7Ie.8sEwfekX1ejj3dA9IkRFdQZdtMcQpQJUe2Iha', 'externo', '2021-01-20 20:37:41', '2021-01-20 20:37:41');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carritos`
--
ALTER TABLE `carritos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `carrito_producto`
--
ALTER TABLE `carrito_producto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_carrito` (`id_carrito`),
  ADD KEY `id_talle` (`id_talle`,`id_color`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `colores`
--
ALTER TABLE `colores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `marcas`
--
ALTER TABLE `marcas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `producto_color`
--
ALTER TABLE `producto_color`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `producto_talle`
--
ALTER TABLE `producto_talle`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_talle` (`id_talle`);

--
-- Indices de la tabla `stocks`
--
ALTER TABLE `stocks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_talle` (`id_talle`),
  ADD KEY `id_color` (`id_color`),
  ADD KEY `stock` (`stock`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `talles`
--
ALTER TABLE `talles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `talle` (`talle`);

--
-- Indices de la tabla `tipos`
--
ALTER TABLE `tipos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carritos`
--
ALTER TABLE `carritos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `carrito_producto`
--
ALTER TABLE `carrito_producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `colores`
--
ALTER TABLE `colores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `marcas`
--
ALTER TABLE `marcas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT de la tabla `producto_color`
--
ALTER TABLE `producto_color`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT de la tabla `producto_talle`
--
ALTER TABLE `producto_talle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;

--
-- AUTO_INCREMENT de la tabla `stocks`
--
ALTER TABLE `stocks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT de la tabla `talles`
--
ALTER TABLE `talles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `tipos`
--
ALTER TABLE `tipos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD CONSTRAINT `imagenes_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `producto_talle`
--
ALTER TABLE `producto_talle`
  ADD CONSTRAINT `producto_talle_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`),
  ADD CONSTRAINT `producto_talle_ibfk_2` FOREIGN KEY (`id_talle`) REFERENCES `talles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
