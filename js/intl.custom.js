/* Country code for every .phone-input
   - markup: <input class="phone-input" data-countrycode-id="qCountryCodeX" type="tel">
             <input type="hidden" id="qCountryCodeX" name="country_code" value="+91">
   - the hidden field always holds the selected dial code, e.g. "+91" */
(function () {
    if (typeof window.intlTelInput !== "function") return;

    document.querySelectorAll(".phone-input").forEach(function (input) {
        var iti = window.intlTelInput(input, {
            initialCountry: "in",
            preferredCountries: ["in", "ae", "us", "gb", "sg", "ca", "au"],
            separateDialCode: true,
            autoPlaceholder: "off"
        });

        var hidden = document.getElementById(input.getAttribute("data-countrycode-id"));

        function syncCode() {
            var data = iti.getSelectedCountryData();
            if (hidden && data && data.dialCode) hidden.value = "+" + data.dialCode;
        }

        input.addEventListener("countrychange", syncCode);
        syncCode();

        // digits only
        input.addEventListener("input", function () {
            var clean = input.value.replace(/[^0-9]/g, "");
            if (clean !== input.value) input.value = clean;
        });
    });
})();
