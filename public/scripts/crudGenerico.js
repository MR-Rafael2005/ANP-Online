// CRUD Genérico para Firestore - ANP Online
// Permite operações CRUD reutilizáveis para qualquer coleção

class CRUDGenerico {
    constructor() {
        this.db = firebase.firestore();
    }

    // CREATE - Adicionar um ou múltiplos documentos
    async create(collection, data) {
        try {
            // Se for array, adiciona múltiplos
            if (Array.isArray(data)) {
                const batch = this.db.batch();
                const results = [];

                data.forEach(item => {
                    const docRef = this.db.collection(collection).doc();
                    batch.set(docRef, {
                        ...item,
                        id: docRef.id,
                        criadoEm: firebase.firestore.FieldValue.serverTimestamp()
                    });
                    results.push(docRef.id);
                });

                await batch.commit();
                return { success: true, ids: results };
            } 
            // Se for objeto único
            else {
                const docRef = await this.db.collection(collection).add({
                    ...data,
                    criadoEm: firebase.firestore.FieldValue.serverTimestamp()
                });
                return { success: true, id: docRef.id };
            }
        } catch (error) {
            console.error('Erro ao criar:', error);
            return { success: false, error: error.message };
        }
    }

    // READ - Ler documentos com filtros flexíveis
    async read(collection, options = {}) {
        try {
            let query = this.db.collection(collection);

            // Aplicar filtros
            if (options.where) {
                options.where.forEach(filter => {
                    query = query.where(filter.field, filter.operator, filter.value);
                });
            }

            // Aplicar ordenação
            if (options.orderBy) {
                query = query.orderBy(options.orderBy.field, options.orderBy.direction || 'asc');
            }

            // Aplicar limite
            if (options.limit) {
                query = query.limit(options.limit);
            }

            const snapshot = await query.get();
            const docs = [];
            
            snapshot.forEach(doc => {
                docs.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            return { success: true, data: docs };
        } catch (error) {
            console.error('Erro ao ler:', error);
            return { success: false, error: error.message };
        }
    }

    // UPDATE - Atualizar um ou múltiplos documentos
    async update(collection, updates) {
        try {
            // Se for array de updates
            if (Array.isArray(updates)) {
                const batch = this.db.batch();

                updates.forEach(update => {
                    const docRef = this.db.collection(collection).doc(update.id);
                    batch.update(docRef, {
                        ...update.data,
                        atualizadoEm: firebase.firestore.FieldValue.serverTimestamp()
                    });
                });

                await batch.commit();
                return { success: true, updated: updates.length };
            }
            // Se for update único
            else {
                await this.db.collection(collection).doc(updates.id).update({
                    ...updates.data,
                    atualizadoEm: firebase.firestore.FieldValue.serverTimestamp()
                });
                return { success: true, id: updates.id };
            }
        } catch (error) {
            console.error('Erro ao atualizar:', error);
            return { success: false, error: error.message };
        }
    }

    // DELETE - Deletar um ou múltiplos documentos
    async delete(collection, ids) {
        try {
            // Se for array de IDs
            if (Array.isArray(ids)) {
                const batch = this.db.batch();

                ids.forEach(id => {
                    const docRef = this.db.collection(collection).doc(id);
                    batch.delete(docRef);
                });

                await batch.commit();
                return { success: true, deleted: ids.length };
            }
            // Se for ID único
            else {
                await this.db.collection(collection).doc(ids).delete();
                return { success: true, id: ids };
            }
        } catch (error) {
            console.error('Erro ao deletar:', error);
            return { success: false, error: error.message };
        }
    }

    // BUSCA AVANÇADA - Com múltiplos critérios
    async search(collection, searchOptions) {
        try {
            let query = this.db.collection(collection);

            // Busca por texto (campos específicos)
            if (searchOptions.text && searchOptions.fields) {
                // Para busca por texto, usar array-contains ou >=/<= para strings
                const promises = searchOptions.fields.map(field => {
                    return this.db.collection(collection)
                        .where(field, '>=', searchOptions.text)
                        .where(field, '<=', searchOptions.text + '\uf8ff')
                        .get();
                });

                const snapshots = await Promise.all(promises);
                const allDocs = new Map();

                snapshots.forEach(snapshot => {
                    snapshot.forEach(doc => {
                        allDocs.set(doc.id, { id: doc.id, ...doc.data() });
                    });
                });

                return { success: true, data: Array.from(allDocs.values()) };
            }

            // Busca normal com filtros
            return await this.read(collection, searchOptions);

        } catch (error) {
            console.error('Erro na busca:', error);
            return { success: false, error: error.message };
        }
    }

    // LISTENER - Para atualizações em tempo real
    listener(collection, callback, options = {}) {
        try {
            let query = this.db.collection(collection);

            // Aplicar filtros ao listener
            if (options.where) {
                options.where.forEach(filter => {
                    query = query.where(filter.field, filter.operator, filter.value);
                });
            }

            if (options.orderBy) {
                query = query.orderBy(options.orderBy.field, options.orderBy.direction || 'asc');
            }

            if (options.limit) {
                query = query.limit(options.limit);
            }

            return query.onSnapshot(snapshot => {
                const docs = [];
                snapshot.forEach(doc => {
                    docs.push({ id: doc.id, ...doc.data() });
                });
                callback({ success: true, data: docs });
            }, error => {
                callback({ success: false, error: error.message });
            });

        } catch (error) {
            console.error('Erro no listener:', error);
            callback({ success: false, error: error.message });
        }
    }

    // MÉTODOS DE CONVENIÊNCIA para operações comuns

    // Buscar por ID
    async getById(collection, id) {
        try {
            const doc = await this.db.collection(collection).doc(id).get();
            if (doc.exists) {
                return { success: true, data: { id: doc.id, ...doc.data() } };
            } else {
                return { success: false, error: 'Documento não encontrado' };
            }
        } catch (error) {
            console.error('Erro ao buscar por ID:', error);
            return { success: false, error: error.message };
        }
    }

    // Contar documentos em uma coleção
    async count(collection, options = {}) {
        try {
            const result = await this.read(collection, options);
            return { success: true, count: result.data ? result.data.length : 0 };
        } catch (error) {
            console.error('Erro ao contar:', error);
            return { success: false, error: error.message };
        }
    }

    // Verificar se documento existe
    async exists(collection, id) {
        try {
            const doc = await this.db.collection(collection).doc(id).get();
            return { success: true, exists: doc.exists };
        } catch (error) {
            console.error('Erro ao verificar existência:', error);
            return { success: false, error: error.message };
        }
    }
}

// Instância global para usar em qualquer lugar
const crud = new CRUDGenerico();

// Exemplos de uso (comentados para não executar automaticamente)

/*
// EXEMPLOS DE USO:

// 1. Criar um documento
async function exemploCreate() {
    const resultado = await crud.create('usuarios', {
        nome: 'João Silva',
        email: 'joao@email.com',
        cargo: 'Admin'
    });
    console.log('Usuário criado:', resultado);
}

// 2. Criar múltiplos documentos
async function exemploCreateMultiplos() {
    const resultado = await crud.create('cargos', [
        { nome: 'Admin', nivel: 1, descricao: 'Administrador' },
        { nome: 'Normal', nivel: 2, descricao: 'Usuário comum' },
        { nome: 'Guest', nivel: 3, descricao: 'Visitante' }
    ]);
    console.log('Cargos criados:', resultado);
}

// 3. Ler com filtros
async function exemploRead() {
    const resultado = await crud.read('usuarios', {
        where: [
            { field: 'cargo', operator: '==', value: 'Admin' }
        ],
        orderBy: { field: 'nome', direction: 'asc' },
        limit: 10
    });
    console.log('Usuários admin:', resultado.data);
}

// 4. Atualizar documento
async function exemploUpdate() {
    const resultado = await crud.update('usuarios', {
        id: 'userId123',
        data: { ativo: true, ultimoLogin: new Date() }
    });
    console.log('Usuário atualizado:', resultado);
}

// 5. Deletar múltiplos
async function exemploDelete() {
    const resultado = await crud.delete('logs', ['log1', 'log2', 'log3']);
    console.log('Logs deletados:', resultado);
}

// 6. Buscar por texto
async function exemploBusca() {
    const resultado = await crud.search('usuarios', {
        text: 'João',
        fields: ['nome', 'email']
    });
    console.log('Busca por João:', resultado.data);
}

// 7. Listener em tempo real
function exemploListener() {
    const unsubscribe = crud.listener('cargos', (resultado) => {
        if (resultado.success) {
            console.log('Cargos atualizados:', resultado.data);
            // Atualizar interface aqui
        }
    });
    
    // Para parar o listener: unsubscribe();
}

// 8. Buscar por ID
async function exemploBuscarPorId() {
    const resultado = await crud.getById('usuarios', 'userId123');
    console.log('Usuário encontrado:', resultado.data);
}

// 9. Contar documentos
async function exemploContar() {
    const resultado = await crud.count('usuarios', {
        where: [{ field: 'ativo', operator: '==', value: true }]
    });
    console.log('Usuários ativos:', resultado.count);
}
*/
