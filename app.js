(function ($) {
    const getUrl = (cityName) => `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=148f508fe5d9a656fc6efef7e2d98666&lang=tr&units=metric`;

    const myRequest = async function (url, opttions = null) {
        const fetchRes = await fetch(url, opttions);
        return await fetchRes.json();
    };

    const txtCity$ = $('#city');
    const btnStart$ = txtCity$.parent().find('button').first();
    const dereceler$ = $('#derecler');
    const coordinates$ = $('#coordinates');
    const img$ = $('.img');

    const elements = {
        mimDeger$: dereceler$.find('.mimDeger'),
        ortDeger$: dereceler$.find('.ortDeger'),
        maxDeger$: dereceler$.find('.maxDeger'),
        lat$: coordinates$.find('.lat'),
        lon$: coordinates$.find('.lon'),
    };

    const getValues = (result) => {
        return {
            nornal: result.main.temp.toString(),
            maxDer: result.main.temp_max.toString(),
            minDer: result.main.temp_min.toString(),
            lotDer: result.coord.lat,
            lonDer: result.coord.lon,
            weatherDer: result.weather[0].description,
            toString() {
                return `derece: ${this.nornal} max derece: ${this.maxDer} min deger: ${this.minDer} enlem: ${this.lotDer} boylam: ${this.lonDer} weather: ${this.weatherDer}`
            }
        };
    };

    const setValues = (values) => {
        elements.mimDeger$.text(values.minDer);
        elements.ortDeger$.text(values.nornal);
        elements.maxDeger$.text(values.maxDer);
        elements.lat$.text(values.lotDer);
        elements.lon$.text(values.lonDer);
    };

    const setBackgroudImg = (weatherDer) => {
        // açık hafifYağmur parçalıAzbulutlu azbulutlu
        // switch e donustur
        let src = "./image/sunny.png";
        if (weatherDer == "hafif yağmur" || "parçalı bulutlu") {
            src = "./image/Partly_cloudy-removebg-preview.png"
        }
        img$.attr('src', src);
    }

    const updateCityWeather = async function (as) {
        const url = getUrl(as);
        const result = await myRequest(`${url}`);
        const values = getValues(result);
        setValues(values);
        setBackgroudImg(result.weather[0].description);
    };

    const updateHandler = async () => {
        const val = txtCity$.val();
        if (val.trim()) {
            await updateCityWeather(val.trim());
        }
    };

    btnStart$.on("click", updateHandler);

    txtCity$.on("keypress", async function (event) {
        if (event.which === "Enter") {
            await updateHandler();
        }
    });

})(jQuery);