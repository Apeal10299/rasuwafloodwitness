let incidents = [];

let map;

let markers = [];

let markerLayer;

let coordinateMarker;

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfqldpKfoGVm98BhcWxv4DQNFo0vIm6AyEt4zNpMPOscGVRuw/viewform?usp=publish-editor";

const translations = {

    en: {
        headerTagline: "Mapping eyewitness footage & disaster observations",
        headerStatus: "Community Documentation",
        heroEyebrow: "🇳🇵 NEPAL DISASTER DOCUMENTATION",
        heroTitleLine1: "See where the water came from.",
        heroTitleLine2: "Document what people witnessed.",
        heroText: "A map-based archive of flood, landslide, infrastructure and eyewitness observations from affected areas of Nepal.",
        heroButtonPrimary: "📍 Explore Trishuli",
        heroButtonSecondary: "🗺️ Open Map",
        noticeTitle: "Important information",
        noticeText: "This project documents reported observations and eyewitness footage. It is not an emergency service and should not be used alone to determine whether an area or road is safe.",
        statMappedIncidents: "Mapped incidents",
        statFootageReports: "Footage reports",
        statFloodReports: "Flood reports",
        statLandslides: "Landslides",
        sectionInteractiveMap: "INTERACTIVE MAP",
        mapTitle: "Disaster observations",
        lastDataRefreshLabel: "Last data refresh:",
        lastDataRefreshLoading: "Loading...",
        coordPickerTitle: "📍 Coordinate Picker",
        coordPickerHelp: "Drag the large pin to the footage location",
        latitudeLabel: "Latitude",
        longitudeLabel: "Longitude",
        copyCoordinatesBtn: "📋 Copy",
        resetCoordinatesBtn: "↺ Reset",
        legendTitle: "Legend",
        legendFlood: "Flood",
        legendLandslide: "Landslide",
        legendRoad: "Road",
        legendBridge: "Bridge",
        legendOther: "Other",
        sectionExplore: "EXPLORE",
        findObservationTitle: "Find an observation",
        searchPlaceholder: "🔎 Search location, district...",
        filterAllIncidentTypes: "All incident types",
        filterFlood: "🌊 Flood",
        filterLandslide: "🪨 Landslide",
        filterRoad: "🚧 Road",
        filterBridge: "🌉 Bridge",
        filterCustoms: "🛂 Customs",
        filterOther: "📍 Other",
        sectionObservations: "OBSERVATIONS",
        recentWitnessTitle: "Recent witness reports",
        noResultsTitle: "No observations found",
        noResultsText: "Try changing your search or filters.",
        sectionTimeline: "TIMELINE",
        timelineTitle: "What happened?",
        sectionAboutProject: "ABOUT THIS PROJECT",
        aboutProjectTitle: "Evidence, sources & verification",
        aboutProjectText: "This project documents disaster observations reported by people who witnessed events in affected areas of Nepal.",
        sourceEyewitnessTitle: "Eyewitness footage",
        sourceEyewitnessText: "Videos and photographs are attributed to their original source whenever possible.",
        sourceVerificationTitle: "Verification",
        sourceVerificationText: "Reports are labelled according to the level of verification available.",
        sourceOfficialTitle: "Official information",
        sourceOfficialText: "Official disaster information should always take priority for emergency decisions.",
        communityActionLabel: "COMMUNITY ACTION",
        communityActionTitle: "Help improve public awareness",
        communityReportTitle: "Submit a witness report",
        communityReportText: "Share what you saw, where it happened, and any key details that can help others understand the situation safely.",
        googleFormButton: "Open Google Form",
        communitySafeTitle: "Safe & secure",
        communitySafeText: "Only share public information, avoid sensitive personal data, and confirm details before posting.",
        communityLowImpactTitle: "Low-impact experience",
        communityLowImpactText: "This site is intentionally lightweight, mobile-friendly, and designed to work well even on slower internet connections.",
        footerDescription: "An independent community documentation project.",
        footerMeta: "Open Map • Community Focused",
    },

    zh: {
        headerTagline: "记录目击者视频与灾情观察信息",
        headerStatus: "社区档案",
        heroEyebrow: "🇳🇵 尼泊尔灾害档案",
        heroTitleLine1: "看看洪水从哪里来。",
        heroTitleLine2: "记录人们所见到的情况。",
        heroText: "一个基于地图的灾情档案，汇总尼泊尔受灾地区的洪水、山体滑坡、基础设施和目击者观察信息。",
        heroButtonPrimary: "📍 查看特里苏里",
        heroButtonSecondary: "🗺️ 打开地图",
        noticeTitle: "重要说明",
        noticeText: "本项目仅记录已上报的观察信息和目击视频。它不是紧急服务，不能单独用于判断某个区域或道路是否安全。",
        statMappedIncidents: "已记录事件",
        statFootageReports: "视频记录",
        statFloodReports: "洪水事件",
        statLandslides: "山体滑坡",
        sectionInteractiveMap: "交互地图",
        mapTitle: "灾害观察记录",
        lastDataRefreshLabel: "最近更新：",
        lastDataRefreshLoading: "加载中...",
        coordPickerTitle: "📍 坐标定位",
        coordPickerHelp: "拖动大图钉到视频所在位置",
        latitudeLabel: "纬度",
        longitudeLabel: "经度",
        copyCoordinatesBtn: "📋 复制",
        resetCoordinatesBtn: "↺ 重置",
        legendTitle: "图例",
        legendFlood: "洪水",
        legendLandslide: "山体滑坡",
        legendRoad: "道路",
        legendBridge: "桥梁",
        legendOther: "其他",
        sectionExplore: "筛选",
        findObservationTitle: "查找观察记录",
        searchPlaceholder: "🔎 搜索地点、区域...",
        filterAllIncidentTypes: "全部事件类型",
        filterFlood: "🌊 洪水",
        filterLandslide: "🪨 山体滑坡",
        filterRoad: "🚧 道路",
        filterBridge: "🌉 桥梁",
        filterCustoms: "🛂 海关",
        filterOther: "📍 其他",
        filterVerified: "🟢 已核实",
        filterReported: "🟡 已上报",
        filterUnverified: "⚪ 未核实",
        sectionObservations: "观察记录",
        recentWitnessTitle: "近期目击者报告",
        noResultsTitle: "未找到相关记录",
        noResultsText: "请尝试更改搜索关键词或筛选条件。",
        sectionTimeline: "时间线",
        timelineTitle: "发生了什么？",
        sectionAboutProject: "关于本项目",
        aboutProjectTitle: "证据、来源与核实信息",
        aboutProjectText: "该项目记录了尼泊尔受灾地区目击者所见的灾害观察信息。",
        sourceEyewitnessTitle: "目击视频",
        sourceEyewitnessText: "视频和照片会在可能的情况下标注原始来源。",
        sourceVerificationTitle: "核实信息",
        sourceVerificationText: "报告将按照可用核实程度进行标注。",
        sourceOfficialTitle: "官方信息",
        sourceOfficialText: "紧急情况下，官方灾害信息应优先作为决策依据。",
        communityActionLabel: "社区行动",
        communityActionTitle: "帮助提升公众意识",
        communityReportTitle: "提交目击报告",
        communityReportText: "分享你看到的情况、发生地点以及能帮助他人更安全理解情况的关键信息。",
        googleFormButton: "打开 Google 表单",
        communitySafeTitle: "安全与隐私",
        communitySafeText: "仅分享公开信息，避免敏感个人数据，并在发布前核实细节。",
        communityLowImpactTitle: "低负载体验",
        communityLowImpactText: "本网站设计轻量，适配移动端，并适合在较慢的网络环境中使用。",
        footerDescription: "一个独立的社区灾情记录项目。",
        footerMeta: "地图开放 • 社区聚焦",
    },

    np: {
        headerTagline: "प्रेक्षण गरिएको भिडियो र विपद् अवलोकनको नक्सा",
        headerStatus: "समुदाय डकुमेन्टेसन",
        heroEyebrow: "🇳🇵 नेपाल विपद् अभिलेख",
        heroTitleLine1: "पानी कहाँबाट आयो?",
        heroTitleLine2: "मानिसहरूले के देखे?",
        heroText: "नेपालका प्रभावित क्षेत्रहरूमा देखिएका बाढ़ी, पहिरो, पूर्वाधार र eyewitness घटनाहरूको नक्सा आधारित सूची।",
        heroButtonPrimary: "📍 त्रिशुली हेरनुहोस्",
        heroButtonSecondary: "🗺️ नक्सा खोल्नुहोस्",
        noticeTitle: "महत्त्वपूर्ण जानकारी",
        noticeText: "यो परियोजना रिपोर्ट भएका अवलोकन र दृश्य साक्ष्यहरूलाई समेट्छ। यो आपतकालीन सेवा होइन र कुनै क्षेत्र वा सड़क सुरक्षित छ कि छैन भनेर निर्णय गर्न एकल आधारमा प्रयोग गर्न मिल्दैन।",
        statMappedIncidents: "नक्सामा दर्ज घटनाहरू",
        statFootageReports: "भिडियो रिपोर्टहरू",
        statFloodReports: "बाढ़ी रिपोर्टहरू",
        statLandslides: "पहिरो",
        sectionInteractiveMap: "इंटरेक्टिभ मेप",
        mapTitle: "विपद् अवलोकन",
        lastDataRefreshLabel: "अन्तिम अपडेट:",
        lastDataRefreshLoading: "लोड हुँदै...",
        coordPickerTitle: "📍 कोर्डिनेट चयन",
        coordPickerHelp: "भिडियो परेको ठाउँमा ठूलो पिन ड्र्याग गर्नुहोस्",
        latitudeLabel: "अक्षांश",
        longitudeLabel: "देशान्तर",
        copyCoordinatesBtn: "📋 कापी",
        resetCoordinatesBtn: "↺ रिसेट",
        legendTitle: "लेजेण्ड",
        legendFlood: "बाढ़ी",
        legendLandslide: "पहिरो",
        legendRoad: "सडक",
        legendBridge: "पुल",
        legendOther: "अन्य",
        sectionExplore: "अन्वेषण",
        findObservationTitle: "अवलोकन खोज्नुहोस्",
        searchPlaceholder: "🔎 स्थान, जिल्ला खोज्नुहोस्...",
        filterAllIncidentTypes: "सबै घटना प्रकार",
        filterFlood: "🌊 बाढ़ी",
        filterLandslide: "🪨 पहिरो",
        filterRoad: "🚧 सडक",
        filterBridge: "🌉 पुल",
        filterCustoms: "🛂 Customs",
        filterOther: "📍 अन्य",
        filterVerified: "🟢 प्रमाणित",
        filterReported: "🟡 रिपोर्ट गरियो",
        filterUnverified: "⚪ अप्रमाणित",
        sectionObservations: "अवलोकनहरू",
        recentWitnessTitle: "हालको साक्षी रिपोर्ट",
        noResultsTitle: "कुनै अवलोकन भेटिएन",
        noResultsText: "खोज वा फिल्टर परिवर्तन गरी हेर्नुहोस्।",
        sectionTimeline: "टाइमलाइन",
        timelineTitle: "के भयो?",
        sectionAboutProject: "यो परियोजना बारे",
        aboutProjectTitle: "प्रमाण, स्रोत र प्रमाणीकरण",
        aboutProjectText: "यो परियोजना नेपालका प्रभावित क्षेत्रहरूमा घटनाहरू देखेका व्यक्तिहरूको सूचना र साक्ष्यहरू समेट्छ।",
        sourceEyewitnessTitle: "साक्षी भिडियो",
        sourceEyewitnessText: "भिडियो र फोटोहरू सम्भव भएमा उनीहरूको मूल स्रोत सहित उल्लेख गरिन्छ।",
        sourceVerificationTitle: "प्रमाणीकरण",
        sourceVerificationText: "रिपोर्टलाई उपलब्ध प्रमाणीकरणको आधारमा लेबल गरिन्छ।",
        sourceOfficialTitle: "अधिकारिक सूचना",
        sourceOfficialText: "आपतकालीन निर्णयको लागि सरकारी सूचना prioritise हुनु पर्दछ।",
        communityActionLabel: "समुदाय सक्रियता",
        communityActionTitle: "सार्वजनिक चेतना बढाउनुहोस्",
        communityReportTitle: "साक्षी रिपोर्ट पेश गर्नुहोस्",
        communityReportText: "तपाईंले देख्नु भएको, कहिले र कहाँ भयो, र अन्यलाई सही ढंगले बुझ्न सहयोग गर्ने महत्त्वपूर्ण विवरण साझा गर्नुहोस्।",
        googleFormButton: "Google फारम खोल्नुहोस्",
        communitySafeTitle: "सुरक्षित र गोपनीय",
        communitySafeText: "केवल सार्वजनिक जानकारी साझा गर्नुहोस्, संवेदनशील व्यक्तिगत जानकारी नदिई, पोस्ट गर्नु अघि विवरण पुष्टि गर्नुहोस्।",
        communityLowImpactTitle: "कम प्रभावीय अनुभव",
        communityLowImpactText: "यो साइट हल्का, मोबाइलमैत्री र ढिला इन्टरनेटमा पनि राम्रोसँग काम गर्ने गरी बनाइएको छ।",
        footerDescription: "एक स्वतन्त्र समुदाय डकुमेन्टेसन परियोजना।",
        footerMeta: "नक्सा खुला • समुदाय केन्द्रित",
    }

};


function applyTranslations(lang = "en") {

    const current = translations[lang] || translations.en;

    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.dataset.i18n;

        if (current[key]) {
            element.textContent = current[key];
        }

    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {

        const key = element.dataset.i18nPlaceholder;

        if (current[key]) {
            element.placeholder = current[key];
        }

    });

    document.querySelectorAll(".lang-btn").forEach(button => {

        button.classList.toggle("active", button.dataset.lang === lang);

    });

    document.documentElement.lang = lang === "zh" ? "zh-CN" : lang === "np" ? "ne" : "en";

}


function configureGoogleFormLink() {

    const formLink = document.getElementById("googleFormLink");

    if (!formLink)
        return;

    if (!GOOGLE_FORM_URL || GOOGLE_FORM_URL.includes("your-google-form-link")) {

        formLink.href = "#";
        formLink.classList.add("disabled");
        formLink.textContent = "Add Google Form URL";
        formLink.setAttribute("aria-disabled", "true");

        return;

    }

    formLink.href = GOOGLE_FORM_URL;
    formLink.classList.remove("disabled");
    formLink.textContent = "Open Google Form";
    formLink.removeAttribute("aria-disabled");

}


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


function parseIncidentDateTime(incident) {

    const date = String(incident?.date || "").trim();
    const time = String(incident?.time || "").trim();

    if (!date) {
        return null;
    }

    if (!time) {
        const parsed = new Date(date);
        return Number.isNaN(parsed.getTime()) ? null : parsed;
    }

    const match = time.match(/(\d{1,2}):(\d{2})\s*([AP]M)/i);

    if (match) {

        let [, hourRaw, minuteRaw, meridian] = match;
        let hour = Number(hourRaw);
        const minute = Number(minuteRaw);

        if (meridian.toUpperCase() === "PM" && hour < 12) {
            hour += 12;
        }

        if (meridian.toUpperCase() === "AM" && hour === 12) {
            hour = 0;
        }

        return new Date(
            Number(date.slice(0, 4)),
            Number(date.slice(5, 7)) - 1,
            Number(date.slice(8, 10)),
            hour,
            minute
        );

    }

    const parsed = new Date(`${date} ${time}`);
    return Number.isNaN(parsed.getTime()) ? null : parsed;

}


function generateIncidentKey(incident) {

    const id = String(incident?.id ?? "").trim();
    const date = String(incident?.date ?? "").trim();
    const time = String(incident?.time ?? "").trim();

    return `${id}|${date}|${time}`;

}


function getVisibleIncidents(items = []) {

    const unique = new Map();

    (Array.isArray(items) ? items : []).forEach(incident => {

        const key = generateIncidentKey(incident);

        if (!key || unique.has(key)) {
            return;
        }

        unique.set(key, incident);

    });

    return Array.from(unique.values()).sort((a, b) => {

        const aDateTime = parseIncidentDateTime(a)?.getTime?.() ?? 0;
        const bDateTime = parseIncidentDateTime(b)?.getTime?.() ?? 0;

        return aDateTime - bDateTime;

    });

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
            getVisibleIncidents(
                Array.isArray(
                    data.incidents
                )
                    ? data.incidents
                    : []
            );


configureGoogleFormLink();

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

    const visibleIncidents = getVisibleIncidents(incidents);

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
            visibleIncidents.length;


    if (footage)
        footage.textContent =
            visibleIncidents.reduce(

                (total, item) =>
                    total +
                    normalizeFootage(
                        item.footage
                    ).length,

                0

            );


    if (floods)
        floods.textContent =
            visibleIncidents.filter(

                item =>
                    item.type === "Flood"

            ).length;


    if (landslides)
        landslides.textContent =
            visibleIncidents.filter(

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

    const visibleFiltered = getVisibleIncidents(filtered);

    markerLayer.clearLayers();

    markers = [];


    visibleFiltered.forEach(

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

    const visibleFiltered = getVisibleIncidents(filtered);

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


    if (!visibleFiltered.length) {


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
                                incident.time + " || " + incident.date
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

    const visibleFiltered = getVisibleIncidents(filtered);

    const timeline =
        document.getElementById(
            "timeline"
        );


    if (!timeline)
        return;


    timeline.innerHTML = "";


    const visibleItems = visibleFiltered;

    const maxHeight = Math.min(visibleFiltered.length * 110, 520);

    timeline.style.maxHeight = `${maxHeight}px`;
    timeline.style.overflowY = "auto";
    timeline.style.paddingRight = "8px";

    visibleItems.forEach(

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
        getVisibleIncidents(
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

            )
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


        applyTranslations("en");


        document.querySelectorAll(".lang-btn").forEach(button => {

            button.addEventListener("click", () => {

                applyTranslations(button.dataset.lang || "en");

            });

        });


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