document.addEventListener("DOMContentLoaded", function () {
  API.getMyInfluencersOffers()
    .then(offers => {
      var offersMerged = [].concat.apply([], offers);
      var mo = document.getElementById('offers-list')
      offersMerged.forEach(elem => {
        console.log(elem);
        var div = document.createElement('div');
        div.innerHTML = `
        <div class="col-3 d-flex align-content-center flex-wrap offer-box-left">
          <img src="${elem.business.businessImg}" class="offer-img">
        </div>
        <div class="col-7 d-flex flex-column align-items-start offer-box-right">
          <div class="row">
            <h2>${elem.name}</h2>
          </div>
          <div class="row">
            <span>${elem.description}</span>
          </div>
        </div>
        <div class="col-2 d-flex align-content-center flex-wrap get-button">
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".offer-${elem._id}">Get</button>
          <div class="modal fade offer-${elem._id}" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-sm">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" id="mySmallModalLabel">${elem.name}</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div class="modal-body">
                  <h4>CODE</h4>
                  <span class="input-group-text" style="text-align: center; margin-bottom: 15px;">${elem.offerCode}</span>
                  <h4>URL</h4>
                  <a href="${elem.offerURL}">${elem.offerURL}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        `
        div.className = "row offer-box";
        mo.appendChild(div)
      });
    })
    .catch(function (error) {
      console.log(error.response);
    });

});