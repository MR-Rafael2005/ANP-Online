function createNotificationElement(notification, notificationId) {
    // Definir ícone e cor baseado no tipo/gravidade
    const { iconClass, bgClass, iconType } = getNotificationStyle(notification.type, notification.severity);
    
    // Formatar data
    const formattedDate = formatNotificationDate(notification.createdAt);
    
    // Criar elemento
    const notificationDiv = document.createElement('a');
    notificationDiv.className = `dropdown-item d-flex align-items-center ${!notification.isRead ? 'bg-light' : ''}`;
    notificationDiv.href = '#';
    
    notificationDiv.innerHTML = `
        <div class="mr-3">
            <div class="icon-circle ${bgClass}">
                <i class="${iconClass} ${iconType} text-white"></i>
            </div>
        </div>
        <div>
            <div class="small text-gray-500">${formattedDate}</div>
            <span class="font-weight-bold">${notification.message}</span>
        </div>
    `;
    
    return notificationDiv;
}

function getNotificationStyle(type, severity) {
    // Definir estilos baseado no tipo e gravidade
    const styles = {
        'ocorrencia': {
            'gravissima': { iconClass: 'fas', bgClass: 'bg-danger', iconType: 'fa-exclamation-triangle' },
            'grave': { iconClass: 'fas', bgClass: 'bg-danger', iconType: 'fa-info' },
            'moderada': { iconClass: 'fas', bgClass: 'bg-warning', iconType: 'fa-info' },
            'leve': { iconClass: 'fas', bgClass: 'bg-primary', iconType: 'fa-info' }
        },
        'sistema': {
            'info': { iconClass: 'fas', bgClass: 'bg-info', iconType: 'fa-bell' },
            'aviso': { iconClass: 'fas', bgClass: 'bg-warning', iconType: 'fa-exclamation-triangle' },
            'erro': { iconClass: 'fas', bgClass: 'bg-danger', iconType: 'fa-times' }
        },
        'usuario': {
            'perfil': { iconClass: 'fas', bgClass: 'bg-success', iconType: 'fa-user' },
            'permissao': { iconClass: 'fas', bgClass: 'bg-info', iconType: 'fa-key' }
        }
    };
    
    return styles[type]?.[severity] || { iconClass: 'fas', bgClass: 'bg-secondary', iconType: 'fa-bell' };
}

function addNotification(bgColor, iconClass, date, message) {
    // Buscar o container de notificações
    const notificationsArea = document.getElementById('notifications-area');
    
    // Criar o elemento da notificação
    const notificationElement = document.createElement('a');
    notificationElement.className = 'dropdown-item d-flex align-items-center';
    
    notificationElement.innerHTML = `
        <div class="mr-3">
            <div class="icon-circle ${bgColor}">
                <i class="${iconClass} text-white"></i>
            </div>
        </div>
        <div>
            <div class="small text-gray-500">${date}</div>
            <span class="font-weight-bold">${message}</span>
        </div>
    `;
    
    // Adicionar ao container (no início, antes das outras notificações)
    notificationsArea.insertBefore(notificationElement, notificationsArea.firstChild);
}
