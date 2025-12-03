fetch("/pages/_includes/leftNavbar.html")
    .then(res => {
        if (!res.ok) {
            throw new Error(`Erro HTTP: ${res.status}`);
        }
        return res.text();
    })
    .then(data => {
        document.getElementById('left-navbar-include').innerHTML = data;
        
        initializeSidebarEvents();
        
        console.log("Left Navbar included successfully.");
    })
    .catch(error => {
        console.error("Erro ao carregar navbar:", error);
    });

// Função para inicializar eventos da sidebar
function initializeSidebarEvents() {
    // Aguardar um tick para garantir que o DOM foi atualizado
    setTimeout(() => {
        // 1. Botão toggle da sidebar
        const sidebarToggle = document.getElementById('sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', function() {
                document.body.classList.toggle('sidebar-toggled');
                document.querySelector('.sidebar').classList.toggle('toggled');
                console.log("Sidebar toggled!");
            });
            console.log("✅ Sidebar toggle inicializado");
        } else {
            console.error("❌ Botão sidebarToggle não encontrado");
        }

        // 2. Links com collapse (Bootstrap)
        const collapseLinks = document.querySelectorAll('[data-toggle="collapse"]');
        collapseLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetSelector = this.getAttribute('data-target');
                const target = document.querySelector(targetSelector);
                
                if (target) {
                    target.classList.toggle('show');
                }
            });
        });
        
        console.log(`✅ ${collapseLinks.length} links de collapse inicializados`);
        
    }, 100); // 100ms de delay para garantir que o DOM foi processado
}