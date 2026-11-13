const productosIniciales = [
    {
        id: 1,
        nombre: "Mini Donas Salseras",
        categoria: "MINI_DONAS",
        imagen: "images/mini-donas-salseras.png",
        descripcion: "Mini donas de vainilla recién hechas, cubiertas con 2 deliciosas salsas dulces y combinadas con 2 toppings irresistibles.",
        opciones: [
            { cantidad: 6, texto: "6 Unidades", precio: 25000 },
            { cantidad: 8, texto: "8 Unidades", precio: 30000 },
            { cantidad: 10, texto: "10 Unidades", precio: 35000 },
            { cantidad: 12, texto: "12 Unidades", precio: 40000 },
            { cantidad: 16, texto: "16 Unidades", precio: 45000 }
        ]
    },
    {
        id: 2,
        nombre: "Mini Donas Especiales",
        categoria: "MINI_DONAS",
        imagen: "images/mini-donas-especiales.png",
        descripcion: "Mini donas de vainilla recién hechas, recubiertas de chocolate con decoración sencilla con 1 topping y líneas de chocolate.",
        opciones: [
            { cantidad: 1, texto: "Unidad individual", precio: 3000 },
            { cantidad: 6, texto: "6 Unidades", precio: 35000 },
            { cantidad: 8, texto: "8 Unidades", precio: 40000 },
            { cantidad: 10, texto: "10 Unidades", precio: 45000 },
            { cantidad: 12, texto: "12 Unidades", precio: 50000 },
            { cantidad: 16, texto: "16 Unidades", precio: 55000 }
        ]
    },
    {
        id: 3,
        nombre: "Mini Brocheta",
        categoria: "MINI_DONAS",
        imagen: "images/mini-donas-brochetas.png",
        descripcion: "Mini donas de vainilla recubiertas de chocolate negro, blanco o de color con decoración sencilla con 2 toppings a tu elección.",
        opciones: [
            { cantidad: 2, texto: "2 Unidades", precio: 15000 },
            { cantidad: 3, texto: "3 Unidades", precio: 20000 },
            { cantidad: 4, texto: "4 Unidades", precio: 25000 }
        ]
    },
    {
        id: 4,
        nombre: "Mini Bandeja",
        categoria: "MINI_DONAS",
        imagen: "images/bandeja-donas.png",
        descripcion: "20 mini donas de vainilla recién hechas: 10 recubiertas de chocolate con decoración de 2 toppings a tu elección más salsa a tu gusto.",
        opciones: [
            { cantidad: 20, texto: "20 Unidades", precio: 60000 }
        ]
    },
    {
        id: 5,
        nombre: "Mini Vaso Clásico",
        categoria: "MINI_DONAS",
        imagen: "images/vaso-clasico.png",
        descripcion: "6 Mini donas de vainilla recubiertas de chocolate negro o blanco con decoración sencilla con 2 toppings a tu elección.",
        opciones: [
            { cantidad: 6, texto: "6 Unidades en Vaso", precio: 20000 }
        ]
    },
    {
        id: 6,
        nombre: "Mini Vaso DoniFresa",
        categoria: "MINI_DONAS",
        imagen: "images/vaso-especial.png",
        descripcion: "6 mini donas recién hechas con fresas frescas, suave crema batida, deliciosa salsa de chocolate y oreo triturado.",
        opciones: [
            { cantidad: 6, texto: "6 Unidades con Fresa", precio: 25000 }
        ]
    },
    {
        id: 7,
        nombre: "Hot Dona",
        categoria: "MINI_DONAS",
        imagen: "images/hot-dona.png",
        descripcion: "Mini donas de vainilla bañadas en salsa con decoración sencilla de 1 topping a tu elección.",
        opciones: [
            { cantidad: 6, texto: "6 Unidades Hot", precio: 10000 }
        ]
    },
    {
        id: 8,
        nombre: "Mini Donas Temáticas: Feliz Cumpleaños",
        categoria: "MINI_DONAS_TEMATICAS",
        imagen: "images/donas-cumpleanos.png",
        descripcion: "Suaves mini donas de vainilla bañadas en fino chocolate, decoradas 100% a mano para celebrar cumpleaños.",
        opciones: [
            { cantidad: 6, texto: "6 Unidades", precio: 55000 },
            { cantidad: 9, texto: "9 Unidades", precio: 65000 },
            { cantidad: 12, texto: "12 Unidades", precio: 75000 },
            { cantidad: 16, texto: "16 Unidades", precio: 95000 },
            { cantidad: 20, texto: "20 Unidades", precio: 120000 }
        ]
    },
    {
        id: 9,
        nombre: "Mini Donas Temáticas: Te amo / Te quiero",
        categoria: "MINI_DONAS_TEMATICAS",
        imagen: "imagenes/donas-amor.png",
        descripcion: "Detalle romántico con mini donas de vainilla bañadas en fino chocolate, decoradas a mano con mensajes de amor.",
        opciones: [
            { cantidad: 6, texto: "6 Unidades", precio: 55000 },
            { cantidad: 9, texto: "9 Unidades", precio: 65000 },
            { cantidad: 12, texto: "12 Unidades", precio: 75000 },
            { cantidad: 16, texto: "16 Unidades", precio: 95000 },
            { cantidad: 20, texto: "20 Unidades", precio: 120000 }
        ]
    },
    {
        id: 10,
        nombre: "Mini Donas Temáticas: Feliz Día (Mamá / Papá)",
        categoria: "MINI_DONAS_TEMATICAS",
        imagen: "imagenes/donas-felizdia.png",
        descripcion: "Un detalle tierno y delicioso para celebrar fechas especiales con fina cobertura de chocolate decorada a mano.",
        opciones: [
            { cantidad: 6, texto: "6 Unidades", precio: 55000 },
            { cantidad: 9, texto: "9 Unidades", precio: 65000 },
            { cantidad: 12, texto: "12 Unidades", precio: 75000 },
            { cantidad: 16, texto: "16 Unidades", precio: 95000 },
            { cantidad: 20, texto: "20 Unidades", precio: 120000 }
        ]
    },
    {
        id: 11,
        nombre: "Gomi Mix",
        categoria: "DESAYUNOS",
        imagen: "images/logo.png",
        descripcion: "Bandeja surtida con variedad de gomas y masmelos",
        opciones: [
            { cantidad: 1, texto: "Gomi Mix", precio: 40000 }
        ]
    },
    {
        id: 12,
        nombre: "DulceMania",
        categoria: "DESAYUNOS",
        imagen: "images/logo.png",
        descripcion: "Un detalle irresistible y 100% personalizable. Incluye bandeja decorada, moño y tarjeta.",
        opciones: [
            { cantidad: 1, texto: "DulceMania", precio: 45000 }
        ]
    },
    {
        id: 13,
        nombre: "Sweet Candy",
        categoria: "DESAYUNOS",
        imagen: "images/logo.png",
        descripcion: "Un regalo inolvidable que lo tiene todo para consentir y sorprender. Incluye bandeja decorada, globo, moño y tarjeta personalizada.",
        opciones: [
            { cantidad: 1, texto: "Sweet Candy", precio: 45000 }
        ]
    },
    {
        id: 14,
        nombre: "Mix Sweet",
        categoria: "DESAYUNOS",
        imagen: "images/logo.png",
        descripcion: "Un regalo inolvidable que lo tiene todo para consentir y sorprender. Incluye bandeja decorada, globo, moño y tarjeta personalizada.",
        opciones: [
            { cantidad: 1, texto: "Mix Sweet", precio: 50000 }
        ]
    },
    {
        id: 15,
        nombre: "Sweet Dreams",
        categoria: "DESAYUNOS",
        imagen: "images/logo.png",
        descripcion: "Un regalo inolvidable que lo tiene todo para consentir y sorprender. Incluye bandeja decorada, globo, moño y tarjeta personalizada.",
        opciones: [
            { cantidad: 1, texto: "Sweet Dreams", precio: 55000 }
        ]
    },
];

let productos = JSON.parse(localStorage.getItem('mundos_productos')) || productosIniciales;