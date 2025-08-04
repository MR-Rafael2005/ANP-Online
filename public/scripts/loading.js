function showLoading() {
    // Verifica se já existe um elemento de loading e o remove
    //hideLoading();

    //div para o loading
    const loadingElement = document.createElement('div');
    loadingElement.classList.add('loading');

    // texto de carregamento
    const loadingText = document.createElement('label');
    loadingText.textContent = 'Carregando...';
    loadingText.style.color = '#fff';

    //juntando os elementos
    loadingElement.appendChild(loadingText);
    
    // Estilizando o elemento de loading
    loadingElement.style.display = 'flex';
    loadingElement.style.justifyContent = 'center';
    loadingElement.style.alignItems = 'center';
    loadingElement.style.position = 'fixed';
    loadingElement.style.height = '100vh';
    loadingElement.style.width = '100vw';
    loadingElement.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    loadingElement.style.zIndex = '99999';
    loadingElement.style.margin = '0';
    loadingElement.style.padding = '0';
    loadingElement.style.top = '0';
    loadingElement.style.left = '0';
    
    document.body.appendChild(loadingElement);
}

function hideLoading() {
    const loadingElements = document.getElementsByClassName('loading');
    
    for (let i = 0; i < loadingElements.length; i++) 
    {
        loadingElements[i].remove();
    }
}
