/* =========================================================
   CONTROL DE GUÍAS DE TRANSPORTE Y LOGÍSTICA
   GEOVANNY CHAVES
   ========================================================= */


/* =========================================================
   CONFIGURACIÓN
========================================================= */

const CLAVE_STORAGE = "Gyguias";

const USUARIO_CORRECTO = "Geovanny2026";
const CLAVE_CORRECTA = "Gy1234";

const CLAVE_SESION = "sesionActiva";


/* =========================================================
   VARIABLES
========================================================= */

let Gyguias = [];

let indiceSeleccionado = -1;


/* =========================================================
   CARGAR DATOS DESDE LOCALSTORAGE
========================================================= */

function cargarDatos() {

    try {

        const datosGuardados =
            localStorage.getItem(CLAVE_STORAGE);

        if (datosGuardados) {

            const datos = JSON.parse(datosGuardados);

            if (Array.isArray(datos)) {

                Gyguias = datos;

            } else {

                Gyguias = [];

            }

        } else {

            Gyguias = [];

        }

    } catch (error) {

        console.error(
            "Error al cargar Gyguias:",
            error
        );

        Gyguias = [];

    }

}


/* =========================================================
   GUARDAR DATOS EN LOCALSTORAGE
========================================================= */

function guardarDatos() {

    try {

        localStorage.setItem(
            CLAVE_STORAGE,
            JSON.stringify(Gyguias)
        );

        return true;

    } catch (error) {

        console.error(
            "Error al guardar Gyguias:",
            error
        );

        mostrarMensaje(
            "❌ No se pudieron guardar los datos.",
            "error"
        );

        return false;

    }

}


/* =========================================================
   ELEMENTOS DEL LOGIN
========================================================= */

const login = document.getElementById("login");
const sistema = document.getElementById("sistema");

const usuario = document.getElementById("usuario");
const clave = document.getElementById("clave");

const btnLogin = document.getElementById("btnLogin");
const mostrarClave = document.getElementById("mostrarClave");

const mensajeLogin =
    document.getElementById("mensajeLogin");

const cerrarSesion =
    document.getElementById("cerrarSesion");


/* =========================================================
   MOSTRAR / OCULTAR CONTRASEÑA
========================================================= */

if (mostrarClave) {

    mostrarClave.addEventListener(
        "click",
        function () {

            if (clave.type === "password") {

                clave.type = "text";

                mostrarClave.textContent = "🙈";

            } else {

                clave.type = "password";

                mostrarClave.textContent = "👁️";

            }

        }
    );

}


/* =========================================================
   INICIAR SESIÓN
========================================================= */

function iniciarSesion() {

    const usuarioIngresado =
        usuario.value.trim();

    const claveIngresada =
        clave.value;

    if (
        usuarioIngresado === USUARIO_CORRECTO &&
        claveIngresada === CLAVE_CORRECTA
    ) {

        sessionStorage.setItem(
            CLAVE_SESION,
            "true"
        );

        mostrarSistema();

        mensajeLogin.textContent = "";

        usuario.value = "";
        clave.value = "";

    } else {

        mensajeLogin.textContent =
            "❌ Usuario o contraseña incorrectos.";

        mensajeLogin.classList.add("error");

    }

}


/* =========================================================
   MOSTRAR SISTEMA
========================================================= */

function mostrarSistema() {

    if (login) {

        login.style.display = "none";

    }

    if (sistema) {

        sistema.classList.remove(
            "sistema-oculto"
        );

        sistema.style.display = "block";

    }

    mostrarGuias();

}


/* =========================================================
   MOSTRAR LOGIN
========================================================= */

function mostrarLogin() {

    if (login) {

        login.style.display = "flex";

    }

    if (sistema) {

        sistema.classList.add(
            "sistema-oculto"
        );

        sistema.style.display = "none";

    }

}


/* =========================================================
   VERIFICAR SESIÓN
========================================================= */

function verificarSesion() {

    const sesion =
        sessionStorage.getItem(
            CLAVE_SESION
        );

    if (sesion === "true") {

        mostrarSistema();

    } else {

        mostrarLogin();

    }

}


/* =========================================================
   CERRAR SESIÓN
========================================================= */

if (cerrarSesion) {

    cerrarSesion.addEventListener(
        "click",
        function () {

            sessionStorage.removeItem(
                CLAVE_SESION
            );

            indiceSeleccionado = -1;

            limpiarFormulario();

            mostrarLogin();

        }
    );

}


/* =========================================================
   LOGIN CON BOTÓN
========================================================= */

if (btnLogin) {

    btnLogin.addEventListener(
        "click",
        iniciarSesion
    );

}


/* =========================================================
   LOGIN CON ENTER
========================================================= */

if (usuario) {

    usuario.addEventListener(
        "keydown",
        function (evento) {

            if (evento.key === "Enter") {

                iniciarSesion();

            }

        }
    );

}


if (clave) {

    clave.addEventListener(
        "keydown",
        function (evento) {

            if (evento.key === "Enter") {

                iniciarSesion();

            }

        }
    );

}


/* =========================================================
   ELEMENTOS DEL FORMULARIO
========================================================= */

const guia =
    document.getElementById("guia");

const numeroRuta =
    document.getElementById("numeroRuta");

const fecha =
    document.getElementById("fecha");

const placa =
    document.getElementById("placa");

const lugar =
    document.getElementById("lugar");

const monto =
    document.getElementById("monto");

const montoDeducible =
    document.getElementById(
        "montoDeducible"
    );

const totalPagar =
    document.getElementById(
        "totalPagar"
    );

const hojas =
    document.getElementById("hojas");

const estado =
    document.getElementById("estado");


/* =========================================================
   BOTONES
========================================================= */

const agregar =
    document.getElementById("agregar");

const modificar =
    document.getElementById("modificar");

const eliminar =
    document.getElementById("eliminar");

const obtener =
    document.getElementById("obtener");

const limpiar =
    document.getElementById("limpiar");


/* =========================================================
   TABLA Y MENSAJES
========================================================= */

const tablaGuias =
    document.getElementById(
        "tablaGuias"
    );

const contador =
    document.getElementById(
        "contador"
    );

const salida =
    document.getElementById("salida");


/* =========================================================
   BÚSQUEDA Y FILTROS
========================================================= */

const buscarGuia =
    document.getElementById(
        "buscarGuia"
    );

const filtrarRuta =
    document.getElementById(
        "filtrarRuta"
    );

const filtrarPlaca =
    document.getElementById(
        "filtrarPlaca"
    );

const filtrarEstado =
    document.getElementById(
        "filtrarEstado"
    );

const ordenar =
    document.getElementById(
        "ordenar"
    );

const quitarFiltros =
    document.getElementById(
        "quitarFiltros"
    );


/* =========================================================
   MOSTRAR MENSAJES
========================================================= */

function mostrarMensaje(
    mensaje,
    tipo = ""
) {

    if (!salida) return;

    salida.textContent = mensaje;

    salida.className = "mensaje";

    if (tipo) {

        salida.classList.add(tipo);

    }

}


/* =========================================================
   CALCULAR TOTAL
========================================================= */

function calcularTotal() {

    const valorMonto =
        parseFloat(monto.value) || 0;

    let valorDeducible =
        parseFloat(
            montoDeducible.value
        ) || 0;


    if (valorDeducible < 0) {

        valorDeducible = 0;

        montoDeducible.value = 0;

    }


    if (
        valorMonto > 0 &&
        valorDeducible > valorMonto
    ) {

        valorDeducible = valorMonto;

        montoDeducible.value =
            valorMonto;

    }


    const total =
        Math.max(
            0,
            valorMonto - valorDeducible
        );


    totalPagar.value =
        total.toFixed(2);

}


/* =========================================================
   EVENTOS PARA CALCULAR TOTAL
========================================================= */

if (monto) {

    monto.addEventListener(
        "input",
        calcularTotal
    );

}

if (montoDeducible) {

    montoDeducible.addEventListener(
        "input",
        calcularTotal
    );

}


/* =========================================================
   VALIDAR FORMULARIO
========================================================= */

function validarFormulario() {

    const numeroGuia =
        guia.value.trim();

    const ruta =
        numeroRuta.value.trim();

    const fechaValor =
        fecha.value.trim();

    const placaValor =
        placa.value.trim();

    const lugarValor =
        lugar.value.trim();

    const montoValor =
        parseFloat(monto.value);

    const deducibleValor =
        parseFloat(
            montoDeducible.value
        );

    const hojasValor =
        parseInt(hojas.value);

    const estadoValor =
        estado.value;


    if (!numeroGuia) {

        mostrarMensaje(
            "❌ Debe ingresar el número de guía.",
            "error"
        );

        guia.focus();

        return false;

    }


    if (!ruta) {

        mostrarMensaje(
            "❌ Debe ingresar el número de ruta.",
            "error"
        );

        numeroRuta.focus();

        return false;

    }


    if (Number(ruta) < 0) {

        mostrarMensaje(
            "❌ El número de ruta no puede ser negativo.",
            "error"
        );

        numeroRuta.focus();

        return false;

    }


    if (!fechaValor) {

        mostrarMensaje(
            "❌ Debe seleccionar la fecha.",
            "error"
        );

        fecha.focus();

        return false;

    }


    if (!placaValor) {

        mostrarMensaje(
            "❌ Debe ingresar el número de placa.",
            "error"
        );

        placa.focus();

        return false;

    }


    if (!lugarValor) {

        mostrarMensaje(
            "❌ Debe ingresar el lugar o destino.",
            "error"
        );

        lugar.focus();

        return false;

    }


    if (
        isNaN(montoValor) ||
        montoValor <= 0
    ) {

        mostrarMensaje(
            "❌ El monto debe ser mayor que 0.",
            "error"
        );

        monto.focus();

        return false;

    }


    if (
        isNaN(deducibleValor) ||
        deducibleValor < 0
    ) {

        mostrarMensaje(
            "❌ El monto deducible no puede ser negativo.",
            "error"
        );

        montoDeducible.focus();

        return false;

    }


    if (
        deducibleValor > montoValor
    ) {

        mostrarMensaje(
            "❌ El monto deducible no puede ser mayor que el monto.",
            "error"
        );

        montoDeducible.focus();

        return false;

    }


    if (
        isNaN(hojasValor) ||
        hojasValor < 1 ||
        hojasValor > 10
    ) {

        mostrarMensaje(
            "❌ La cantidad de hojas debe estar entre 1 y 10.",
            "error"
        );

        hojas.focus();

        return false;

    }


    if (!estadoValor) {

        mostrarMensaje(
            "❌ Debe seleccionar un estado.",
            "error"
        );

        estado.focus();

        return false;

    }


    return true;

}


/* =========================================================
   OBTENER DATOS DEL FORMULARIO
========================================================= */

function obtenerDatosFormulario() {

    const valorMonto =
        parseFloat(monto.value);

    const valorDeducible =
        parseFloat(
            montoDeducible.value
        ) || 0;

    const valorTotal =
        Math.max(
            0,
            valorMonto - valorDeducible
        );


    return {

        guia:
            guia.value.trim(),

        numeroRuta:
            Number(numeroRuta.value),

        fecha:
            fecha.value,

        placa:
            placa.value.trim().toUpperCase(),

        lugar:
            lugar.value.trim(),

        monto:
            valorMonto,

        montoDeducible:
            valorDeducible,

        totalPagar:
            valorTotal,

        hojas:
            Number(hojas.value),

        estado:
            estado.value

    };

}


/* =========================================================
   LIMPIAR FORMULARIO
========================================================= */

function limpiarFormulario() {

    guia.value = "";

    numeroRuta.value = "";

    fecha.value = "";

    placa.value = "";

    lugar.value = "";

    monto.value = "";

    montoDeducible.value = "0";

    totalPagar.value = "";

    hojas.value = "";

    estado.value = "";

    indiceSeleccionado = -1;

}


/* =========================================================
   FORMATO DE DINERO
========================================================= */

function formatoDinero(valor) {

    const numero =
        Number(valor) || 0;

    return "₡" +
        numero.toLocaleString(
            "es-CR",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

}


/* =========================================================
   CLASE DEL ESTADO
========================================================= */

function obtenerClaseEstado(
    estadoValor
) {

    switch (estadoValor) {

        case "Aprobadas":

            return "estado-aprobadas";


        case "En tránsito":

            return "estado-transito";


        case "Disputa":

            return "estado-disputa";


        case "Cancelado":

            return "estado-cancelado";


        case "Recepcionada":

            return "estado-recepcionada";


        case "Rechazada":

            return "estado-rechazada";


        default:

            return "";

    }

}


/* =========================================================
   ACTUALIZAR FILTRO DE RUTAS
========================================================= */

function actualizarFiltroRutas() {

    const valorActual =
        filtrarRuta.value;

    const rutas = [
        ...new Set(
            Gyguias
                .map(item => item.numeroRuta)
                .filter(
                    ruta =>
                        ruta !== undefined &&
                        ruta !== null &&
                        ruta !== ""
                )
        )
    ];

    rutas.sort(
        (a, b) =>
            Number(a) - Number(b)
    );


    filtrarRuta.innerHTML =
        '<option value="todos">Todas las rutas</option>';


    rutas.forEach(
        function (ruta) {

            const option =
                document.createElement(
                    "option"
                );

            option.value = ruta;

            option.textContent =
                ruta;

            filtrarRuta.appendChild(
                option
            );

        }
    );


    if (
        rutas.includes(
            Number(valorActual)
        )
    ) {

        filtrarRuta.value =
            valorActual;

    } else {

        filtrarRuta.value =
            "todos";

    }

}


/* =========================================================
   ACTUALIZAR FILTRO DE PLACAS
========================================================= */

function actualizarFiltroPlacas() {

    const valorActual =
        filtrarPlaca.value;

    const placas = [
        ...new Set(
            Gyguias
                .map(item => item.placa)
                .filter(
                    placa =>
                        placa &&
                        placa.trim() !== ""
                )
        )
    ];


    placas.sort(
        (a, b) =>
            a.localeCompare(
                b,
                "es",
                {
                    sensitivity: "base"
                }
            )
    );


    filtrarPlaca.innerHTML =
        '<option value="todos">Todas las placas</option>';


    placas.forEach(
        function (placaValor) {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                placaValor;

            option.textContent =
                placaValor;

            filtrarPlaca.appendChild(
                option
            );

        }
    );


    if (
        placas.includes(valorActual)
    ) {

        filtrarPlaca.value =
            valorActual;

    } else {

        filtrarPlaca.value =
            "todos";

    }

}


/* =========================================================
   ORDENAR GUÍAS
========================================================= */

function ordenarGuias(lista) {

    const orden =
        ordenar.value;


    const copia =
        [...lista];


    switch (orden) {

        case "guiaAsc":

            copia.sort(
                (a, b) =>
                    String(a.guia)
                        .localeCompare(
                            String(b.guia),
                            "es",
                            {
                                numeric: true
                            }
                        )
            );

            break;


        case "guiaDesc":

            copia.sort(
                (a, b) =>
                    String(b.guia)
                        .localeCompare(
                            String(a.guia),
                            "es",
                            {
                                numeric: true
                            }
                        )
            );

            break;


        case "rutaAsc":

            copia.sort(
                (a, b) =>
                    Number(a.numeroRuta) -
                    Number(b.numeroRuta)
            );

            break;


        case "rutaDesc":

            copia.sort(
                (a, b) =>
                    Number(b.numeroRuta) -
                    Number(a.numeroRuta)
            );

            break;


        case "fechaAsc":

            copia.sort(
                (a, b) =>
                    String(a.fecha)
                        .localeCompare(
                            String(b.fecha)
                        )
            );

            break;


        case "fechaDesc":

            copia.sort(
                (a, b) =>
                    String(b.fecha)
                        .localeCompare(
                            String(a.fecha)
                        )
            );

            break;


        case "placaAsc":

            copia.sort(
                (a, b) =>
                    String(a.placa)
                        .localeCompare(
                            String(b.placa),
                            "es"
                        )
            );

            break;


        case "placaDesc":

            copia.sort(
                (a, b) =>
                    String(b.placa)
                        .localeCompare(
                            String(a.placa),
                            "es"
                        )
            );

            break;


        case "montoAsc":

            copia.sort(
                (a, b) =>
                    Number(a.monto) -
                    Number(b.monto)
            );

            break;


        case "montoDesc":

            copia.sort(
                (a, b) =>
                    Number(b.monto) -
                    Number(a.monto)
            );

            break;


        case "deducibleAsc":

            copia.sort(
                (a, b) =>
                    Number(a.montoDeducible) -
                    Number(b.montoDeducible)
            );

            break;


        case "deducibleDesc":

            copia.sort(
                (a, b) =>
                    Number(b.montoDeducible) -
                    Number(a.montoDeducible)
            );

            break;


        case "totalAsc":

            copia.sort(
                (a, b) =>
                    Number(a.totalPagar) -
                    Number(b.totalPagar)
            );

            break;


        case "totalDesc":

            copia.sort(
                (a, b) =>
                    Number(b.totalPagar) -
                    Number(a.totalPagar)
            );

            break;


        case "hojasAsc":

            copia.sort(
                (a, b) =>
                    Number(a.hojas) -
                    Number(b.hojas)
            );

            break;


        case "hojasDesc":

            copia.sort(
                (a, b) =>
                    Number(b.hojas) -
                    Number(a.hojas)
            );

            break;

    }


    return copia;

}


/* =========================================================
   MOSTRAR GUÍAS EN TABLA
========================================================= */

function mostrarGuias() {

    if (!tablaGuias) return;


    tablaGuias.innerHTML = "";


    const textoBusqueda =
        buscarGuia.value
            .trim()
            .toLowerCase();


    const rutaSeleccionada =
        filtrarRuta.value;


    const placaSeleccionada =
        filtrarPlaca.value;


    const estadoSeleccionado =
        filtrarEstado.value;


    let lista =
        Gyguias.filter(
            function (item) {

                const coincideGuia =
                    !textoBusqueda ||
                    String(item.guia)
                        .toLowerCase()
                        .includes(
                            textoBusqueda
                        );


                const coincideRuta =
                    rutaSeleccionada === "todos" ||
                    String(item.numeroRuta) ===
                    String(rutaSeleccionada);


                const coincidePlaca =
                    placaSeleccionada === "todos" ||
                    String(item.placa)
                        .toUpperCase() ===
                    String(placaSeleccionada)
                        .toUpperCase();


                const coincideEstado =
                    estadoSeleccionado === "todos" ||
                    item.estado ===
                    estadoSeleccionado;


                return (
                    coincideGuia &&
                    coincideRuta &&
                    coincidePlaca &&
                    coincideEstado
                );

            }
        );


    lista =
        ordenarGuias(lista);


    contador.textContent =
        lista.length === 1
            ? "1 guía"
            : `${lista.length} guías`;


    if (lista.length === 0) {

        tablaGuias.innerHTML = `
            <tr>
                <td colspan="11" class="sin-datos">
                    No hay guías que coincidan con la búsqueda.
                </td>
            </tr>
        `;

        return;

    }


    lista.forEach(
        function (item) {

            const indiceReal =
                Gyguias.indexOf(item);


            const fila =
                document.createElement(
                    "tr"
                );


            fila.innerHTML = `

                <td>
                    <strong>
                        ${escaparHTML(item.guia)}
                    </strong>
                </td>

                <td>
                    ${escaparHTML(item.numeroRuta)}
                </td>

                <td>
                    ${escaparHTML(item.fecha)}
                </td>

                <td>
                    ${escaparHTML(item.placa)}
                </td>

                <td>
                    ${escaparHTML(item.lugar)}
                </td>

                <td>
                    ${formatoDinero(item.monto)}
                </td>

                <td>
                    ${formatoDinero(item.montoDeducible)}
                </td>

                <td>
                    <strong>
                        ${formatoDinero(item.totalPagar)}
                    </strong>
                </td>

                <td>
                    ${escaparHTML(item.hojas)}
                </td>

                <td>

                    <span
                        class="estado ${obtenerClaseEstado(item.estado)}"
                    >
                        ${escaparHTML(item.estado)}
                    </span>

                </td>

                <td>

                    <div class="acciones-tabla">

                        <button
                            type="button"
                            class="btn-tabla btn-editar-tabla"
                            data-indice="${indiceReal}"
                        >
                            ✏️
                        </button>

                        <button
                            type="button"
                            class="btn-tabla btn-eliminar-tabla"
                            data-indice="${indiceReal}"
                        >
                            🗑️
                        </button>

                    </div>

                </td>

            `;


            tablaGuias.appendChild(
                fila
            );

        }
    );


    agregarEventosTabla();

}


/* =========================================================
   EVITAR HTML NO DESEADO
========================================================= */

function escaparHTML(valor) {

    if (
        valor === undefined ||
        valor === null
    ) {

        return "";

    }


    return String(valor)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   SELECCIONAR GUÍA
========================================================= */

function cargarGuiaEnFormulario(
    indice
) {

    const item =
        Gyguias[indice];


    if (!item) {

        mostrarMensaje(
            "❌ No se encontró la guía.",
            "error"
        );

        return;

    }


    indiceSeleccionado =
        indice;


    guia.value =
        item.guia || "";


    numeroRuta.value =
        item.numeroRuta ?? "";


    fecha.value =
        item.fecha || "";


    placa.value =
        item.placa || "";


    lugar.value =
        item.lugar || "";


    monto.value =
        item.monto ?? "";


    montoDeducible.value =
        item.montoDeducible ?? 0;


    totalPagar.value =
        Number(
            item.totalPagar ?? 0
        ).toFixed(2);


    hojas.value =
        item.hojas ?? "";


    estado.value =
        item.estado || "";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    mostrarMensaje(
        `✏️ Guía ${item.guia} cargada para modificar.`,
        "exito"
    );

}


/* =========================================================
   EVENTOS DE LOS BOTONES DE LA TABLA
========================================================= */

function agregarEventosTabla() {

    const botonesEditar =
        document.querySelectorAll(
            ".btn-editar-tabla"
        );


    botonesEditar.forEach(
        function (boton) {

            boton.addEventListener(
                "click",
                function () {

                    const indice =
                        Number(
                            this.dataset.indice
                        );

                    cargarGuiaEnFormulario(
                        indice
                    );

                }
            );

        }
    );


    const botonesEliminar =
        document.querySelectorAll(
            ".btn-eliminar-tabla"
        );


    botonesEliminar.forEach(
        function (boton) {

            boton.addEventListener(
                "click",
                function () {

                    const indice =
                        Number(
                            this.dataset.indice
                        );

                    eliminarGuiaPorIndice(
                        indice
                    );

                }
            );

        }
    );

}


/* =========================================================
   AGREGAR GUÍA
========================================================= */

if (agregar) {

    agregar.addEventListener(
        "click",
        function () {

            if (!validarFormulario()) {

                return;

            }


            const datos =
                obtenerDatosFormulario();


            const guiaExiste =
                Gyguias.some(
                    function (item) {

                        return (
                            String(item.guia)
                                .trim()
                                .toLowerCase() ===
                            datos.guia
                                .trim()
                                .toLowerCase()
                        );

                    }
                );


            if (guiaExiste) {

                mostrarMensaje(
                    `❌ La guía ${datos.guia} ya existe.`,
                    "error"
                );

                guia.focus();

                return;

            }


            Gyguias.push(
                datos
            );


            if (!guardarDatos()) {

                return;

            }


            actualizarFiltroRutas();

            actualizarFiltroPlacas();

            mostrarGuias();

            limpiarFormulario();


            mostrarMensaje(
                `✅ Guía ${datos.guia} agregada correctamente y guardada en Gyguias.`,
                "exito"
            );

        }
    );

}


/* =========================================================
   OBTENER GUÍA
========================================================= */

if (obtener) {

    obtener.addEventListener(
        "click",
        function () {

            const numeroGuia =
                guia.value.trim();


            if (!numeroGuia) {

                mostrarMensaje(
                    "❌ Escriba un número de guía para buscar.",
                    "error"
                );

                guia.focus();

                return;

            }


            const indice =
                Gyguias.findIndex(
                    function (item) {

                        return (
                            String(item.guia)
                                .trim()
                                .toLowerCase() ===
                            numeroGuia
                                .toLowerCase()
                        );

                    }
                );


            if (indice === -1) {

                mostrarMensaje(
                    `❌ No se encontró la guía ${numeroGuia}.`,
                    "error"
                );

                return;

            }


            cargarGuiaEnFormulario(
                indice
            );

        }
    );

}


/* =========================================================
   MODIFICAR GUÍA
========================================================= */

if (modificar) {

    modificar.addEventListener(
        "click",
        function () {

            if (!validarFormulario()) {

                return;

            }


            const datos =
                obtenerDatosFormulario();


            const guiaOriginal =
                guia.value
                    .trim()
                    .toLowerCase();


            const indice =
                Gyguias.findIndex(
                    function (item) {

                        return (
                            String(item.guia)
                                .trim()
                                .toLowerCase() ===
                            guiaOriginal
                        );

                    }
                );


            if (indice === -1) {

                mostrarMensaje(
                    `❌ No se encontró la guía ${datos.guia} para modificar.`,
                    "error"
                );

                return;

            }


            const guiaDuplicada =
                Gyguias.some(
                    function (item, i) {

                        return (
                            i !== indice &&
                            String(item.guia)
                                .trim()
                                .toLowerCase() ===
                            guiaOriginal
                        );

                    }
                );


            if (guiaDuplicada) {

                mostrarMensaje(
                    "❌ Ya existe otra guía con ese número.",
                    "error"
                );

                return;

            }


            Gyguias[indice] =
                datos;


            if (!guardarDatos()) {

                return;

            }


            actualizarFiltroRutas();

            actualizarFiltroPlacas();

            mostrarGuias();

            limpiarFormulario();


            mostrarMensaje(
                `✅ Guía ${datos.guia} modificada correctamente.`,
                "exito"
            );

        }
    );

}


/* =========================================================
   ELIMINAR GUÍA POR ÍNDICE
========================================================= */

function eliminarGuiaPorIndice(
    indice
) {

    const item =
        Gyguias[indice];


    if (!item) {

        mostrarMensaje(
            "❌ No se encontró la guía.",
            "error"
        );

        return;

    }


    const confirmar =
        confirm(
            `¿Está seguro de eliminar la guía ${item.guia}?`
        );


    if (!confirmar) {

        return;

    }


    Gyguias.splice(
        indice,
        1
    );


    if (!guardarDatos()) {

        return;

    }


    actualizarFiltroRutas();

    actualizarFiltroPlacas();

    mostrarGuias();

    limpiarFormulario();


    mostrarMensaje(
        `🗑️ Guía ${item.guia} eliminada correctamente.`,
        "exito"
    );

}


/* =========================================================
   ELIMINAR GUÍA DESDE FORMULARIO
========================================================= */

if (eliminar) {

    eliminar.addEventListener(
        "click",
        function () {

            const numeroGuia =
                guia.value.trim();


            if (!numeroGuia) {

                mostrarMensaje(
                    "❌ Escriba el número de guía que desea eliminar.",
                    "error"
                );

                guia.focus();

                return;

            }


            const indice =
                Gyguias.findIndex(
                    function (item) {

                        return (
                            String(item.guia)
                                .trim()
                                .toLowerCase() ===
                            numeroGuia
                                .toLowerCase()
                        );

                    }
                );


            if (indice === -1) {

                mostrarMensaje(
                    `❌ No se encontró la guía ${numeroGuia}.`,
                    "error"
                );

                return;

            }


            eliminarGuiaPorIndice(
                indice
            );

        }
    );

}


/* =========================================================
   BOTÓN LIMPIAR
========================================================= */

if (limpiar) {

    limpiar.addEventListener(
        "click",
        function () {

            limpiarFormulario();

            mostrarMensaje(
                "🔄 Formulario limpiado.",
                "exito"
            );

        }
    );

}


/* =========================================================
   BÚSQUEDA EN TIEMPO REAL
========================================================= */

if (buscarGuia) {

    buscarGuia.addEventListener(
        "input",
        function () {

            mostrarGuias();

        }
    );

}


/* =========================================================
   FILTRO POR RUTA
========================================================= */

if (filtrarRuta) {

    filtrarRuta.addEventListener(
        "change",
        function () {

            mostrarGuias();

        }
    );

}


/* =========================================================
   FILTRO POR PLACA
========================================================= */

if (filtrarPlaca) {

    filtrarPlaca.addEventListener(
        "change",
        function () {

            mostrarGuias();

        }
    );

}


/* =========================================================
   FILTRO POR ESTADO
========================================================= */

if (filtrarEstado) {

    filtrarEstado.addEventListener(
        "change",
        function () {

            mostrarGuias();

        }
    );

}


/* =========================================================
   ORDENAR
========================================================= */

if (ordenar) {

    ordenar.addEventListener(
        "change",
        function () {

            mostrarGuias();

        }
    );

}


/* =========================================================
   QUITAR FILTROS
========================================================= */

if (quitarFiltros) {

    quitarFiltros.addEventListener(
        "click",
        function () {

            buscarGuia.value = "";

            filtrarRuta.value =
                "todos";

            filtrarPlaca.value =
                "todos";

            filtrarEstado.value =
                "todos";

            ordenar.value =
                "guiaAsc";


            mostrarGuias();


            mostrarMensaje(
                "🔄 Se quitaron todos los filtros.",
                "exito"
            );

        }
    );

}


/* =========================================================
   INICIO DEL SISTEMA
========================================================= */

cargarDatos();

actualizarFiltroRutas();

actualizarFiltroPlacas();

calcularTotal();

verificarSesion();
