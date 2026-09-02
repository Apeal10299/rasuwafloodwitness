let incidents = [];

let map;

let markers = [];

let markerLayer;

let coordinateMarker;


/* =====================================================
   MARKER COLORS
===================================================== */

const markerColors = {

    Flood: "#38bdf8",

    Landslide: "#f97316",

    Road: "#facc15",

    Bridge: "#a78bfa",

    Customs: "#22c55e",

    Other: "#94a3b8"

};


function normalizeFootage(footage) {

    if (Array.isArray(footage)) {

        return footage
            .map(item => String(item).trim())
            .filter(Boolean);

    }

    if (typeof footage === "string") {

        const trimmed = footage.trim();

        return trimmed ? [trimmed] : [];

    }

    return [];

}


/* =====================================================
   INITIALIZE MAP
===================================================== */

function initializeMap() {


    map = L.map("map", {

        zoomControl: true,

        minZoom: 6,

        maxZoom: 18

    });


    L.tileLayer(

        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

        {

            attribution:
                "&copy; OpenStreetMap contributors",

            maxZoom: 19

        }

    ).addTo(map);


    map.setView(

        [28.013801, 85.254324],

        7

    );


    markerLayer =
        L.layerGroup().addTo(map);


    /* =================================================
       DRAGGABLE COORDINATE PIN
    ================================================= */

    coordinateMarker =
        L.marker(

            [28.013801, 85.254324],

            {

                draggable: true,

                autoPan: true,

                zIndexOffset: 2000

            }

        ).addTo(map);


    coordinateMarker.bindTooltip(

        "📍 Drag me",

        {

            direction: "top",

            offset: [0, -20]

        }

    );


    coordinateMarker.on(

        "drag",

        updateCoordinates

    );


    coordinateMarker.on(

        "dragend",

        updateCoordinates

    );


    updateCoordinates();

}


/* =====================================================
   UPDATE COORDINATES
===================================================== */

function updateCoordinates() {


    if (!coordinateMarker)
        return;


    const position =
        coordinateMarker.getLatLng();


    const latitude =
        position.lat.toFixed(6);


    const longitude =
        position.lng.toFixed(6);


    const lat =
        document.getElementById(
            "selectedLatitude"
        );


    const lng =
        document.getElementById(
            "selectedLongitude"
        );


    if (lat)
        lat.textContent = latitude;


    if (lng)
        lng.textContent = longitude;

}


/* =====================================================
   COPY COORDINATES
===================================================== */

async function copyCoordinates() {


    if (!coordinateMarker)
        return;


    const position =
        coordinateMarker.getLatLng();


    const text =
        `${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}`;


    try {


        await navigator.clipboard.writeText(
            text
        );


    }


    catch (error) {


        const textarea =
            document.createElement(
                "textarea"
            );


        textarea.value = text;


        document.body.appendChild(
            textarea
        );


        textarea.select();


        document.execCommand(
            "copy"
        );


        textarea.remove();

    }


    const button =
        document.getElementById(
            "copyCoordinates"
        );


    if (button) {


        button.textContent =
            "✓ Copied!";


        setTimeout(

            () => {

                button.textContent =
                    "📋 Copy";

            },

            1500

        );

    }

}


/* =====================================================
   RESET COORDINATES
===================================================== */

function resetCoordinateMarker() {


    if (!coordinateMarker)
        return;


    coordinateMarker.setLatLng(

        [28.3949, 84.1240]

    );


    map.setView(

        [28.3949, 84.1240],

        7

    );


    updateCoordinates();

}


/* =====================================================
   LOAD DATA
===================================================== */

async function loadData() {


    try {


        const response =
            await fetch(

                "data/incidents.json?cache=" +
                Date.now()

            );


        if (!response.ok) {

            throw new Error(
                "Could not load incidents.json"
            );

        }


        const data =
            await response.json();


        incidents =
            Array.isArray(
                data.incidents
            )
            ?
            data.incidents
            :
            [];


        updateDashboard();

        renderMap();

        renderCards();

        renderTimeline();


        const updated =
            document.getElementById(
                "lastUpdated"
            );


        if (updated) {

            updated.textContent =
                formatDate(
                    data.lastUpdated
                );

        }


    }


    catch (error) {


        console.error(
            "Data loading error:",
            error
        );


        const grid =
            document.getElementById(
                "incidentGrid"
            );


        if (grid) {


            grid.innerHTML = `

                <div class="no-results">

                    <div>
                        ⚠️
                    </div>

                    <h3>
                        Unable to load incident data
                    </h3>

                    <p>
                        Check data/incidents.json
                        and your Live Server.
                    </p>

                </div>

            `;

        }

    }

}


/* =====================================================
   DASHBOARD
===================================================== */

function updateDashboard() {


    const total =
        document.getElementById(
            "totalIncidents"
        );


    const footage =
        document.getElementById(
            "totalFootage"
        );


    const floods =
        document.getElementById(
            "totalFloods"
        );


    const landslides =
        document.getElementById(
            "totalLandslides"
        );


    if (total)
        total.textContent =
            incidents.length;


    if (footage)
        footage.textContent =
            incidents.reduce(

                (total, item) =>
                    total +
                    normalizeFootage(
                        item.footage
                    ).length,

                0

            );


    if (floods)
        floods.textContent =
            incidents.filter(

                item =>
                    item.type === "Flood"

            ).length;


    if (landslides)
        landslides.textContent =
            incidents.filter(

                item =>
                    item.type === "Landslide"

            ).length;

}


/* =====================================================
   RENDER MAP
===================================================== */

function renderMap(
    filtered = incidents
) {


    markerLayer.clearLayers();

    markers = [];


    filtered.forEach(

        incident => {


            const lat =
                Number(
                    incident.latitude
                );


            const lng =
                Number(
                    incident.longitude
                );


            if (

                !Number.isFinite(lat) ||

                !Number.isFinite(lng)

            ) {

                return;

            }


            const color =
                markerColors[
                    incident.type
                ]
                ||
                markerColors.Other;


            const marker =
                L.circleMarker(

                    [lat, lng],

                    {

                        radius: 9,

                        fillColor: color,

                        color: "#ffffff",

                        weight: 2,

                        opacity: 1,

                        fillOpacity: 0.9

                    }

                );


            marker.bindPopup(`

                <div>

                    <div class="popup-title">

                        ${escapeHTML(
                            incident.title
                        )}

                    </div>


                    <div class="popup-location">

                        📍

                        ${escapeHTML(
                            incident.location
                        )}

                        <br>

                        ${escapeHTML(
                            incident.district
                        )}

                        <br><br>

                        Coordinates:

                        ${lat.toFixed(6)},

                        ${lng.toFixed(6)}

                    </div>


                    <div class="popup-status">

                        ${getStatusIcon(
                            incident.status
                        )}

                        ${escapeHTML(
                            incident.status
                        )}

                        ·

                        ${escapeHTML(
                            incident.type
                        )}

                    </div>

                </div>

            `);


            marker.addTo(
                markerLayer
            );


            markers.push({

                marker: marker,

                id: incident.id

            });

        }

    );

}


/* =====================================================
   RENDER CARDS
===================================================== */

document.addEventListener(
    "play",
    event => {

        if (
            event.target &&
            event.target.tagName &&
            event.target.tagName.toLowerCase() === "video"
        ) {

            document.querySelectorAll("video").forEach(video => {

                if (
                    video !== event.target &&
                    !video.paused
                ) {

                    video.pause();

                }

            });

        }

    },
    true
);


function renderCards(
    filtered = incidents
) {


    const grid =
        document.getElementById(
            "incidentGrid"
        );


    const noResults =
        document.getElementById(
            "noResults"
        );


    if (!grid)
        return;


    grid.innerHTML = "";


    if (!filtered.length) {


        if (noResults) {

            noResults.classList.remove(
                "hidden"
            );

        }


        return;

    }


    if (noResults) {

        noResults.classList.add(
            "hidden"
        );

    }


    filtered.forEach(

        incident => {


            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "incident-card";


            card.id =
                `incident-${incident.id}`;


            /* =================================================
               MEDIA
            ================================================= */

            let mediaHTML = "";

            const footageItems =
                normalizeFootage(
                    incident.footage
                );


            if (footageItems.length) {

                const mediaMarkup =
                    footageItems
                        .map((footage, index) => {

                            const slideContent =
                                isLocalVideo(
                                    footage
                                )
                                    ? `

                                        <video

                                            class="incident-video"

                                            controls

                                            controlsList="nodownload noplaybackrate"

                                            disablePictureInPicture

                                            playsinline

                                            preload="metadata"

                                            oncontextmenu="return false;"

                                        >

                                            <source

                                                src="${escapeHTML(
                                                    footage
                                                )}"

                                                type="video/mp4"

                                            >

                                            Your browser
                                            cannot play this video.

                                        </video>

                                    `
                                    : `

                                        <div class="incident-icon">

                                            🎥

                                        </div>

                                    `;

                            return `

                                <div
                                    class="media-slide ${index === 0 ? "active" : ""}"
                                    data-index="${index}"
                                >

                                    ${slideContent}

                                </div>

                            `;

                        })
                        .join("");

                const arrowButtons =
                    footageItems.length > 1
                        ? `

                            <button
                                class="media-arrow media-arrow-left"
                                type="button"
                                aria-label="Previous footage"
                            >
                                ‹
                            </button>

                            <button
                                class="media-arrow media-arrow-right"
                                type="button"
                                aria-label="Next footage"
                            >
                                ›
                            </button>

                        `
                        : "";

                const dots =
                    footageItems.length > 1
                        ? `

                            <div class="media-dots">

                                ${footageItems
                                    .map(
                                        (_, index) =>
                                            `<span class="media-dot ${index === 0 ? "active" : ""}" data-index="${index}"></span>`
                                    )
                                    .join("")}

                            </div>

                        `
                        : "";

                mediaHTML = `

                    <div class="incident-media incident-media-preview" data-incident-id="${escapeHTML(
                        incident.id
                    )}">

                        <div class="media-viewport">

                            <div class="media-track">

                                ${mediaMarkup}

                            </div>

                            ${arrowButtons}

                            ${dots}

                            <div class="video-protection-label">

                                © Nepal Flood Witness Map

                            </div>

                        </div>

                    </div>

                `;

            }


            else {


                mediaHTML = `

                    <div class="incident-media">

                        <div class="incident-icon">

                            ${incident.icon || "📍"}

                        </div>

                    </div>

                `;

            }


            /* =================================================
               CARD
            ================================================= */

            card.innerHTML = `

                ${mediaHTML}


                <div class="incident-content">


                    <div class="incident-top">


                        <span class="incident-type">

                            ${escapeHTML(
                                incident.type
                            ).toUpperCase()}

                        </span>


                        <span
                            class="status ${getStatusClass(
                                incident.status
                            )}"
                        >

                            ${getStatusIcon(
                                incident.status
                            )}

                            ${escapeHTML(
                                incident.status
                            )}

                        </span>


                    </div>



                    <h3>

                        ${escapeHTML(
                            incident.title
                        )}

                    </h3>



                    <p>

                        ${escapeHTML(
                            incident.description
                        )}

                    </p>



                    <div class="incident-meta">


                        <span>

                            📍

                            ${escapeHTML(
                                incident.district
                            )}

                        </span>


                        <span>

                            ${escapeHTML(
                                incident.date
                            )}

                        </span>


                    </div>



                    <div class="incident-buttons">


                        <button

                            class="view-btn"

                            data-incident-id="${escapeHTML(
                                incident.id
                            )}"

                        >

                            📍 View on map

                        </button>


                    </div>


                </div>

            `;


            const viewButton =
                card.querySelector(
                    ".view-btn"
                );


            if (viewButton) {


                viewButton.addEventListener(

                    "click",

                    () => {

                        focusIncident(
                            incident.id
                        );

                    }

                );

            }


            const mediaPreview =
                card.querySelector(
                    ".incident-media-preview"
                );


            if (mediaPreview) {

                const track =
                    mediaPreview.querySelector(
                        ".media-track"
                    );

                const slides =
                    Array.from(
                        mediaPreview.querySelectorAll(
                            ".media-slide"
                        )
                    );

                const dots =
                    Array.from(
                        mediaPreview.querySelectorAll(
                            ".media-dot"
                        )
                    );

                const leftButton =
                    mediaPreview.querySelector(
                        ".media-arrow-left"
                    );

                const rightButton =
                    mediaPreview.querySelector(
                        ".media-arrow-right"
                    );

                let currentIndex = 0;

                const updatePreview = () => {

                    if (!track || !slides.length)
                        return;

                    track.style.transform =
                        `translateX(-${currentIndex * 100}%)`;

                    slides.forEach((slide, index) => {

                        slide.classList.toggle(
                            "active",
                            index === currentIndex
                        );

                    });

                    dots.forEach((dot, index) => {

                        dot.classList.toggle(
                            "active",
                            index === currentIndex
                        );

                    });

                };

                if (leftButton) {

                    leftButton.addEventListener(
                        "click",
                        () => {

                            currentIndex =
                                currentIndex > 0
                                    ? currentIndex - 1
                                    : slides.length - 1;

                            updatePreview();

                        }
                    );

                }

                if (rightButton) {

                    rightButton.addEventListener(
                        "click",
                        () => {

                            currentIndex =
                                currentIndex < slides.length - 1
                                    ? currentIndex + 1
                                    : 0;

                            updatePreview();

                        }
                    );

                }

                dots.forEach(dot => {

                    dot.addEventListener(
                        "click",
                        () => {

                            currentIndex =
                                Number(
                                    dot.dataset.index
                                );

                            updatePreview();

                        }
                    );

                });

                updatePreview();

            }


            grid.appendChild(
                card
            );

        }

    );

}


/* =====================================================
   VIDEO TYPE
===================================================== */

function isLocalVideo(path) {


    const lower =
        String(path)
        .toLowerCase();


    return (

        lower.endsWith(".mp4") ||

        lower.endsWith(".webm") ||

        lower.endsWith(".ogg") ||

        lower.startsWith("video/")

    );

}


/* =====================================================
   TIMELINE
===================================================== */

function renderTimeline(
    filtered = incidents
) {


    const timeline =
        document.getElementById(
            "timeline"
        );


    if (!timeline)
        return;


    timeline.innerHTML = "";


    filtered.forEach(

        incident => {


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "timeline-item";


            item.innerHTML = `

                <div class="timeline-time">

                    ${escapeHTML(
                        incident.time || ""
                    )}

                </div>


                <div class="timeline-content">

                    <h3>

                        ${incident.icon || "📍"}

                        ${escapeHTML(
                            incident.title
                        )}

                    </h3>


                    <p>

                        📍

                        ${escapeHTML(
                            incident.location
                        )}

                        ·

                        ${escapeHTML(
                            incident.district
                        )}

                        <br><br>

                        ${escapeHTML(
                            incident.description
                        )}

                    </p>

                </div>

            `;


            timeline.appendChild(
                item
            );

        }

    );

}


/* =====================================================
   FILTERS
===================================================== */

function applyFilters() {


    const search =
        (
            document.getElementById(
                "searchInput"
            )?.value || ""
        )
        .toLowerCase()
        .trim();


    const type =
        document.getElementById(
            "typeFilter"
        )?.value
        ||
        "all";


    const status =
        document.getElementById(
            "statusFilter"
        )?.value
        ||
        "all";


    const filtered =
        incidents.filter(

            item => {


                const searchableText = `

                    ${item.title || ""}

                    ${item.location || ""}

                    ${item.district || ""}

                    ${item.description || ""}

                    ${item.source || ""}

                `.toLowerCase();


                const matchesSearch =

                    !search ||

                    searchableText.includes(
                        search
                    );


                const matchesType =

                    type === "all" ||

                    item.type === type;


                const matchesStatus =

                    status === "all" ||

                    item.status === status;


                return (

                    matchesSearch &&

                    matchesType &&

                    matchesStatus

                );

            }

        );


    renderMap(filtered);

    renderCards(filtered);

    renderTimeline(filtered);

}


/* =====================================================
   VIEW ON MAP
===================================================== */

function focusIncident(id) {


    const incident =
        incidents.find(

            item =>
                String(item.id) ===
                String(id)

        );


    if (!incident) {

        console.error(
            "Incident not found:",
            id
        );

        return;

    }


    const lat =
        Number(
            incident.latitude
        );


    const lng =
        Number(
            incident.longitude
        );


    if (

        !Number.isFinite(lat) ||

        !Number.isFinite(lng)

    ) {

        console.error(
            "Invalid incident coordinates:",
            incident
        );

        return;

    }


    /*
     * Scroll to map
     */

    document
        .querySelector(
            ".map-section"
        )
        ?.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });


    /*
     * Wait for smooth scroll
     */

    setTimeout(

        () => {


            /*
             * Fix Leaflet dimensions
             */

            map.invalidateSize();


            /*
             * Fly directly to incident
             */

            map.flyTo(

                [lat, lng],

                15,

                {

                    animate: true,

                    duration: 1.5

                }

            );


            /*
             * Find marker
             */

            const found =
                markers.find(

                    item =>

                        String(
                            item.id
                        ) ===
                        String(id)

                );


            if (found) {


                /*
                 * Highlight marker
                 */

                highlightMarker(
                    found.marker
                );


                /*
                 * Open popup after zoom
                 */

                setTimeout(

                    () => {

                        found.marker.openPopup();

                    },

                    1600

                );

            }


        },

        500

    );

}


/* =====================================================
   HIGHLIGHT MARKER
===================================================== */

function highlightMarker(marker) {


    marker.setStyle({

        radius: 17,

        weight: 5,

        color: "#ffffff"

    });


    setTimeout(

        () => {


            marker.setStyle({

                radius: 9,

                weight: 2,

                color: "#ffffff"

            });


        },

        4000

    );

}


/* =====================================================
   TRISHULI
===================================================== */

function focusTrishuli() {


    scrollToMap();


    setTimeout(

        () => {


            map.invalidateSize();


            map.flyTo(

                [27.98, 85.22],

                9,

                {

                    animate: true,

                    duration: 1.5

                }

            );


        },

        500

    );

}


/* =====================================================
   SCROLL MAP
===================================================== */

function scrollToMap() {


    document
        .querySelector(
            ".map-section"
        )
        ?.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

}


/* =====================================================
   STATUS
===================================================== */

function getStatusClass(status) {


    return String(
        status || "Unverified"
    ).toLowerCase();

}


function getStatusIcon(status) {


    if (status === "Verified")
        return "🟢";


    if (status === "Reported")
        return "🟡";


    return "⚪";

}


/* =====================================================
   DATE
===================================================== */

function formatDate(dateString) {


    if (!dateString)
        return "Unknown";


    const date =
        new Date(
            dateString
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return dateString;

    }


    return date.toLocaleString(

        "en-NP",

        {

            dateStyle: "medium",

            timeStyle: "short"

        }

    );

}


/* =====================================================
   HTML ESCAPE
===================================================== */

function escapeHTML(value) {


    return String(
        value ?? ""
    )

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}


/* =====================================================
   VIDEO RIGHT CLICK PROTECTION
===================================================== */

document.addEventListener(

    "contextmenu",

    event => {


        if (

            event.target.tagName === "VIDEO" ||

            event.target.closest(
                ".incident-video"
            )

        ) {

            event.preventDefault();

        }

    }

);


/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {


        initializeMap();


        loadData();



        document
            .getElementById(
                "searchInput"
            )
            ?.addEventListener(

                "input",

                applyFilters

            );



        document
            .getElementById(
                "typeFilter"
            )
            ?.addEventListener(

                "change",

                applyFilters

            );



        document
            .getElementById(
                "statusFilter"
            )
            ?.addEventListener(

                "change",

                applyFilters

            );



        document
            .getElementById(
                "copyCoordinates"
            )
            ?.addEventListener(

                "click",

                copyCoordinates

            );



        document
            .getElementById(
                "resetCoordinates"
            )
            ?.addEventListener(

                "click",

                resetCoordinateMarker

            );

    }

);


/* =====================================================
   AUTO REFRESH
===================================================== */

setInterval(

    loadData,

    60000

);