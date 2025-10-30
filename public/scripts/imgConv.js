function convertToBase64(file, options = {}) {
    return new Promise((resolve, reject) => {
        // Image Config
        const config = {
            maxWidth: 800,
            maxHeight: 600,
            quality: 0.8,
            maxFileSize: 500 * 1024, // 500KB 
            outputFormat: 'image/jpeg',
            ...options
        };

        // Verificar se o arquivo é muito grande para ser processado (10x o tamanho máximo permitido)
        if (file.size > config.maxFileSize * 10) 
        { 
            reject(new Error(`Arquivo muito grande. Máximo permitido: ${(config.maxFileSize / 1024).toFixed(0)}KB`));
            return;
        }

        // Verificar se é uma imagem
        if (!file.type.startsWith('image/')) {
            reject(new Error('Arquivo deve ser uma imagem'));
            return;
        }

        const reader = new FileReader();
        
        //Ao carregar o reader...
        reader.onload = (e) => {
            const img = new Image();
            
            //Ao carregar a imagem...
            img.onload = () => {
                try {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    // Calcular novas dimensões mantendo a proporção
                    let { width, height } = img;
                    
                    if (width > config.maxWidth || height > config.maxHeight) 
                    {
                        const aspectRatio = width / height;
                        
                        if (width > height) {
                            width = config.maxWidth;
                            height = width / aspectRatio;
                            
                            if (height > config.maxHeight) {
                                height = config.maxHeight;
                                width = height * aspectRatio;
                            }
                        } else {
                            height = config.maxHeight;
                            width = height * aspectRatio;
                            
                            if (width > config.maxWidth) {
                                width = config.maxWidth;
                                height = width / aspectRatio;
                            }
                        }
                    }
                    
                    // Definir tamanho do canvas
                    canvas.width = width;
                    canvas.height = height;
                    
                    // Melhorar qualidade da renderização
                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = 'high';
                    
                    // Desenhar imagem redimensionada
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    // Converter para Base64 com qualidade especificada
                    let base64Result = canvas.toDataURL(config.outputFormat, config.quality);
                    
                    // Verificar se ainda está muito grande e reduzir qualidade se necessário
                    let attempts = 0;
                    while (base64Result.length > config.maxFileSize * 1.37 && attempts < 5) { // 1.37 é o fator de conversão base64
                        config.quality -= 0.1;
                        if (config.quality < 0.1) config.quality = 0.1;
                        
                        base64Result = canvas.toDataURL(config.outputFormat, config.quality);
                        attempts++;
                    }
                    
                    // Verificar tamanho final
                    const finalSizeKB = (base64Result.length * 0.75) / 1024; // Aproximação do tamanho real
                    
                    resolve({
                        base64: base64Result,
                        originalSize: file.size,
                        finalSize: Math.round(finalSizeKB * 1024),
                        finalSizeKB: Math.round(finalSizeKB),
                        originalDimensions: { width: img.width, height: img.height },
                        finalDimensions: { width, height },
                        compressionRatio: Math.round((1 - (finalSizeKB * 1024) / file.size) * 100),
                        quality: config.quality
                    });
                    
                } catch (error) {
                    reject(new Error('Erro ao processar imagem: ' + error.message));
                }
            };
            
            img.onerror = () => {
                reject(new Error('Erro ao carregar imagem'));
            };
            
            img.src = e.target.result;
        };
        
        reader.onerror = (error) => {
            reject(new Error('Erro ao ler arquivo: ' + error.message));
        };
        
        reader.readAsDataURL(file);
    });
}
