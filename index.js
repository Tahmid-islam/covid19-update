const loadData = async () => {
  const url = `https://api.covid19api.com/summary`;
  const response = await fetch(url);
  const data = await response.json();
  globalUpdate(data);
  countryUpdate(data);
};

loadData();

const globalUpdate = (data) => {
  const { NewConfirmed, TotalConfirmed, NewDeaths, TotalDeaths } = data.Global;
  document.getElementById("global-update").innerHTML = `
  <h1 class="text-center">Global Update(${
    new Date().toLocaleString().split(",")[0]
  })</h1>
        <div class="row g-4 text-center">
          <div class="col-6">
            <div class="border bg-primary rounded-2 shadow-lg text-white py-3">
              <p>New Confirmed</p>
              <h1>${NewConfirmed}</h1>
            </div>
          </div>
          <div class="col-6">
            <div class="border bg-success rounded-2 shadow-lg text-white py-3">
              <p>Total Confirmed</p>
              <h1>${TotalConfirmed}</h1>
            </div>
          </div>
          <div class="col-6">
            <div class="border bg-danger rounded-2 shadow-lg text-white py-3">
              <p>New Deaths</p>
              <h1>${NewDeaths}</h1>
            </div>
          </div>
          <div class="col-6">
            <div class="border bg-warning rounded-2 shadow-lg text-white py-3">
              <p>Total Deaths</p>
              <h1>${TotalDeaths}</h1>
            </div>
          </div>
        </div>
  `;
};

const countryUpdate = (data) => {
  const countries = data.Countries;
  countries.forEach((country) => {
    console.log(country);
    const { Country, TotalConfirmed, TotalDeaths, CountryCode } = country;

    const countrySection = document.getElementById("country-section");
    const div = document.createElement("div");
    div.innerHTML = `<div class="card shadow">
    <div class="card-body bg-dark text-white">
      <h5 class="card-title">${Country}(${CountryCode})</h5>
      <div class="card-text">
        <p>Total Confirmed: ${TotalConfirmed}</p>
        <p>Total Deaths: ${TotalDeaths}</p>
      </div>
    </div> 
  </div>
    `;
    countrySection.appendChild(div);
  });
};
