import "./SettingsPage.css"; // Reuse settings page styling for consistency
import "./SettingsPage.css"; // Reuse settings page styling for consistency

const FAQPage = () => {
  const faqs = [
    {
      question: "Apa itu SwapHour?",
      answer: "SwapHour adalah platform perbankan waktu (Time Banking) di mana pengguna dapat menukar keahlian mereka dengan menggunakan satuan 'Jam Kredit' alih-alih uang tunai."
    },
    {
      question: "Bagaimana cara mendapatkan Jam Kredit?",
      answer: "Setiap pengguna baru mendapatkan saldo awal 5 Jam Kredit. Anda dapat menambah Jam Kredit dengan menerima permintaan bantuan dari orang lain. Setelah Anda menyelesaikan tugas, Jam Kredit akan ditransfer ke dompet Anda."
    },
    {
      question: "Bagaimana cara meminta bantuan?",
      answer: "Anda dapat mencari keahlian yang dibutuhkan di halaman 'Katalog Skill'. Setelah menemukannya, klik 'Tukar Waktu' dan kirimkan permintaan. Saldo Anda akan ditahan sementara hingga tugas selesai."
    },
    {
      question: "Apa yang terjadi jika permintaan saya ditolak?",
      answer: "Jika penyedia keahlian menolak permintaan Anda atau tidak merespons dalam waktu 48 jam, Jam Kredit yang ditahan akan secara otomatis dikembalikan ke saldo Anda."
    },
    {
      question: "Bagaimana jika ada perselisihan?",
      answer: "Anda dapat menggunakan fitur pelaporan atau menghubungi tim dukungan komunitas kami. Kami mendorong penyelesaian secara musyawarah, dan jika diperlukan, admin akan menengahi."
    }
  ];

  return (
      <div className="settings-page">
        <div className="settings-card">
          <h2 className="settings-section-title">Pertanyaan yang Sering Diajukan</h2>
          <p className="text-muted" style={{ marginBottom: "2rem" }}>
            Temukan jawaban untuk pertanyaan umum tentang SwapHour di sini.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {faqs.map((faq, index) => (
              <div key={index} style={{
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                borderRadius: "12px",
                padding: "1.5rem"
              }}>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: "var(--color-text)" }}>
                  {faq.question}
                </h3>
                <p style={{ color: "var(--color-text-muted)", lineHeight: "1.6" }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="settings-card" style={{ marginTop: "2rem", textAlign: "center" }}>
          <h3 style={{ marginBottom: "1rem" }}>Masih Butuh Bantuan?</h3>
          <p className="text-muted" style={{ marginBottom: "1.5rem" }}>
            Tim dukungan kami siap membantu Anda menyelesaikan masalah apa pun.
          </p>
          <button className="settings-btn settings-btn-primary" onClick={() => window.location.href = "mailto:support@swaphour.com"}>
            Hubungi Dukungan
          </button>
        </div>
      </div>
  );
};

export default FAQPage;
