//NÃO FOI TESTADO AINDA!!!
fetch("/pages/_includes/topNavbar.html")
    .then(res => {
        if (!res.ok) {
            throw new Error(`Erro HTTP: ${res.status}`);
        }
        return res.text();
    })
    .then(data => {
        document.getElementById('top-navbar-include').innerHTML = data;
        
        // RENOMEAR: initializeTopNavbarEvents (não sidebar)
        initializeTopNavbarEvents();
        
        console.log("Top Navbar included successfully.");
    })
    .catch(error => {
        console.error("Erro ao carregar top navbar:", error);
    });

// Função para inicializar eventos da TOP navbar
function initializeTopNavbarEvents() {
    setTimeout(() => {
        // 1. Botão toggle da sidebar (MOBILE - top navbar)
        const sidebarToggleTop = document.getElementById('sidebarToggleTop');
        if (sidebarToggleTop) {
            sidebarToggleTop.addEventListener('click', function() {
                document.body.classList.toggle('sidebar-toggled');
                document.querySelector('.sidebar').classList.toggle('toggled');
                console.log("Sidebar toggled from top navbar!");
            });
            console.log("✅ Sidebar toggle TOP inicializado");
        }
        
        // 2. Dropdown de notificações
        const alertsDropdown = document.getElementById('alertsDropdown');
        if (alertsDropdown) {
            alertsDropdown.addEventListener('click', function(e) {
                e.preventDefault();
                const dropdownMenu = this.nextElementSibling;
                if (dropdownMenu) {
                    dropdownMenu.classList.toggle('show');
                }
            });
            console.log("✅ Dropdown de alertas inicializado");
        }
        
        // 3. Dropdown do usuário
        const userDropdown = document.getElementById('userDropdown');
        if (userDropdown) {
            userDropdown.addEventListener('click', function(e) {
                e.preventDefault();
                const dropdownMenu = this.nextElementSibling;
                if (dropdownMenu) {
                    dropdownMenu.classList.toggle('show');
                }
            });
            console.log("✅ Dropdown do usuário inicializado");
        }
        
        // 4. Fechar dropdowns ao clicar fora
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                    menu.classList.remove('show');
                });
            }
        });
        
        console.log("✅ Eventos da top navbar inicializados");
        
    }, 100);
}