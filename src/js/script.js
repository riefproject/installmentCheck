// Fungsi untuk menambahkan titik sebagai pemisah ribuan
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

// Event listener untuk input harga barang
document.getElementById('price').addEventListener('input', function () {
    let value = this.value.replace(/\./g, ''); // Menghapus titik jika ada
    this.value = formatNumber(value); // Memanggil fungsi formatNumber untuk menambahkan titik
});

// Event listener untuk input DP
document.getElementById('dp').addEventListener('input', function () {
    let value = this.value.replace(/\./g, ''); // Menghapus titik jika ada
    this.value = formatNumber(value); // Memanggil fungsi formatNumber untuk menambahkan titik
});

// Event listener untuk input bunga
document.getElementById('interest').addEventListener('input', function () {
    let value = this.value.replace(',', '.'); // Mengganti koma dengan titik
    this.value = value; // Mengupdate nilai input
});

function calculateInstallment() {
    let price = parseInt(document.getElementById('price').value.replace(/\./g, '')); // Menghapus titik sebelum dihitung
    let dp = parseInt(document.getElementById('dp').value.replace(/\./g, '')); // Menghapus titik sebelum dihitung
    let interest = parseFloat(document.getElementById('interest').value.replace(',', '.')); // Mengganti koma dengan titik dan menghapus titik sebelum dihitung
    let duration = parseInt(document.getElementById('duration').value);
    let interestType = document.querySelector('input[name="interestType"]:checked').value;

    // Validasi input
    if (isNaN(price) || isNaN(dp) || isNaN(interest) || isNaN(duration)) {
        alert("Mohon masukkan nilai yang valid.");
        return;
    }

    let loanAmount = price - dp;
    let monthlyInterest = 0.0;

    if (interestType === 'annual') {
        monthlyInterest = (interest / 100) / 12;
    } else {
        monthlyInterest = interest / 100;
    }

    // Perhitungan cicilan bulanan
    let totalInterest = loanAmount * monthlyInterest * duration;
    let installment = (loanAmount + totalInterest) / duration;
    installment = parseFloat(installment.toFixed(2)); // Mengonversi menjadi float dengan 2 desimal
    let formattedInstallment = installment.toLocaleString('id-ID'); // Format dengan titik sebagai pemisah ribuan

    document.getElementById('result').innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Hasil Perhitungan</h5>
                <p class="card-text">Cicilan Bulanan: IDR ${formattedInstallment}</p>
            </div>
        </div>
    `;
}