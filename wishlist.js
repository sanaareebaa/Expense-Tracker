const form = document.getElementById("wishlistForm");
const dateInput = document.getElementById("wishlistDate");
const descInput = document.getElementById("wishlistDescription");
const amountInput = document.getElementById("wishlistAmount");
const savedInput = document.getElementById("wishlistSaved");
const wishlistList = document.querySelector(".wishlist-list");
let editingItem = null;
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const dateVal = dateInput.value;
    const descVal = descInput.value;
    const amountVal = parseFloat(amountInput.value);
    const savedVal = parseFloat(savedInput.value);
    if (isNaN(amountVal) || isNaN(savedVal) || !dateVal || !descVal) {
        alert("Please fill all fields correctly");
        return;
    }
    if (editingItem) {
        const itemId = editingItem.getAttribute("data-id");
        updateWishlist(parseInt(itemId), dateVal, descVal, amountVal, savedVal);
        editingItem.querySelector(".wishlist-date").textContent = dateVal;
        editingItem.querySelector(".wishlist-desc").textContent = descVal;
        editingItem.querySelector(".wishlist-target").textContent =
            "$" + amountVal.toFixed(2);
        editingItem.querySelector(".wishlist-saved").textContent =
            "Saved $" + savedVal.toFixed(2);
        const percent = Math.min((savedVal / amountVal) * 100, 100);
        editingItem.querySelector(".progress-fill").style.width = percent + "%";
        editingItem = null;
        document.querySelector(".add-btn").innerHTML = '<i class="fas fa-plus-circle"></i> Add Wishlist';
    }
    else {
        const wishlist = saveWishlist(dateVal, descVal, amountVal, savedVal);
        const percent = Math.min((savedVal / amountVal) * 100, 100);
        const html = `
        <div class="wishlist-item" data-id="${wishlist.id}">
            <div class="item-header">
                <div class="item-field">
                    <div class="field-label">Target Date</div>
                    <div class="field-value wishlist-date">${dateVal}</div>
                </div>
                <div class="item-field">
                    <div class="field-label">Goal</div>
                    <div class="field-value wishlist-desc">${descVal}</div>
                </div>
                <div class="item-field">
                    <div class="field-label">Target</div>
                    <div class="field-value wishlist-target">$${amountVal.toFixed(
            2,
        )}</div>
                </div>
                <div class="item-field">
                    <i class="fas fa-edit edit-icon"></i>
                    <i class="fas fa-trash delete-icon"></i>
                </div>
            </div>
            <div class="progress-wrapper">
                <div class="progress-track">
                    <div class="progress-fill" style="width:${percent}%"></div>
                </div>
            </div>
            <div class="saved-amount wishlist-saved">
                Saved $${savedVal.toFixed(2)}
            </div>
        </div>
        `;
        wishlistList.insertAdjacentHTML("beforeend", html);
    }
    form.reset();
});
wishlistList.addEventListener("click", function (e) {
    if (e.target.closest(".delete-icon")) {
        const item = e.target.closest(".wishlist-item");
        const itemId = item.getAttribute("data-id");
        deleteWishlist(parseInt(itemId));
        item.remove();
    }
    if (e.target.closest(".edit-icon")) {
        const item = e.target.closest(".wishlist-item");
        const dateText = item.querySelector(".wishlist-date").textContent;
        const descText = item.querySelector(".wishlist-desc").textContent;
        const targetText = item
            .querySelector(".wishlist-target")
            .textContent.replace("$", "");
        const savedText = item
            .querySelector(".wishlist-saved")
            .textContent.replace("Saved $", "");
        dateInput.value = dateText;
        descInput.value = descText;
        amountInput.value = targetText;
        savedInput.value = savedText;
        editingItem = item;
        document.querySelector(".add-btn").innerHTML = '<i class="fas fa-edit"></i> Update Wishlist';
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
});
function loadWishlists() {
    const wishlists = getWishlists();
    wishlistList.innerHTML = "";
    for (let i = 0; i < wishlists.length; i++) {
        const wishlist = wishlists[i];
        const percent = Math.min((wishlist.saved / wishlist.target) * 100, 100);
        const html = `
        <div class="wishlist-item" data-id="${wishlist.id}">
            <div class="item-header">
                <div class="item-field">
                    <div class="field-label">Target Date</div>
                    <div class="field-value wishlist-date">${wishlist.date}</div>
                </div>
                <div class="item-field">
                    <div class="field-label">Goal</div>
                    <div class="field-value wishlist-desc">${wishlist.description}</div>
                </div>
                <div class="item-field">
                    <div class="field-label">Target</div>
                    <div class="field-value wishlist-target">$${wishlist.target.toFixed(
            2,
        )}</div>
                </div>
                <div class="item-field">
                    <i class="fas fa-edit edit-icon"></i>
                    <i class="fas fa-trash delete-icon"></i>
                </div>
            </div>
            <div class="progress-wrapper">
                <div class="progress-track">
                    <div class="progress-fill" style="width:${percent}%"></div>
                </div>
            </div>
            <div class="saved-amount wishlist-saved">
                Saved $${wishlist.saved.toFixed(2)}
            </div>
        </div>
        `;
        wishlistList.insertAdjacentHTML("beforeend", html);
    }
}
document.addEventListener("DOMContentLoaded", loadWishlists);
