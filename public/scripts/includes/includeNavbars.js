// Carregar ambas as navbars
async function loadAllNavbars() {
    try {
        // Carregar left navbar
        if (document.getElementById('left-navbar-include')) {
            const leftResponse = await fetch("/pages/_includes/leftNavbar.html");
            if (leftResponse.ok) {
                const leftData = await leftResponse.text();
                document.getElementById('left-navbar-include').innerHTML = leftData;
            }
        }
        
        // Carregar top navbar
        if (document.getElementById('top-navbar-include')) {
            const topResponse = await fetch("/pages/_includes/topNavbar.html");
            if (topResponse.ok) {
                const topData = await topResponse.text();
                document.getElementById('top-navbar-include').innerHTML = topData;
            }
        }
        
        // Inicializar TODOS os eventos
        initializeAllNavbarEvents();
        
    } catch (error) {
        console.error("Erro ao carregar navbars:", error);
    }
}

function initializeAllNavbarEvents() {
    setTimeout(() => {
        // SIDEBAR TOGGLES (ambos os botões)
        const sidebarToggle = document.getElementById('sidebarToggle'); // Left navbar
        const sidebarToggleTop = document.getElementById('sidebarToggleTop'); // Top navbar
        
        [sidebarToggle, sidebarToggleTop].forEach(button => {
            if (button) {
                button.addEventListener('click', function() {
                    document.body.classList.toggle('sidebar-toggled');
                    document.querySelector('.sidebar').classList.toggle('toggled');
                    console.log("Sidebar toggled!");
                });
            }
        });
        
        // DROPDOWNS
        const alertsDropdown = document.getElementById('alertsDropdown');
        const userDropdown = document.getElementById('userDropdown');
        
        // Substituir a seção dos dropdowns por:
        [alertsDropdown, userDropdown].forEach(dropdown => {
            if (dropdown) {
                dropdown.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation(); // Impede propagação do evento
                    
                    // Fechar outros dropdowns primeiro
                    document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                        if (menu !== this.nextElementSibling) {
                            menu.classList.remove('show');
                        }
                    });
                    
                    // Toggle do dropdown atual
                    const menu = this.nextElementSibling;
                    if (menu && menu.classList.contains('dropdown-menu')) {
                        menu.classList.toggle('show');
                    }
                });
            }
        });
        
        // FECHAR DROPDOWNS AO CLICAR FORA
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                    menu.classList.remove('show');
                });
            }
        });
        
        console.log("Todos os eventos das navbars inicializados");
    }, 100);
}

// Inicializar automaticamente
document.addEventListener('DOMContentLoaded', loadAllNavbars);