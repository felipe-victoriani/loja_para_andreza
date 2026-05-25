# 🚀 PROMPT PARA CRIAR LOJA VIRTUAL COMPLETA COM FIREBASE

## 📋 CONTEXTO

Preciso que você crie uma loja virtual completa para produtos de maquiagem, pijamas e sexy shop, com sistema administrativo, carrinho de compras e integração com Firebase para banco de dados em tempo real.

## 🎯 ESPECIFICAÇÕES DO PROJETO

### **ESTRUTURA DE ARQUIVOS**

```
projeto_loja/
├── index.html              # Página principal
├── README.md               # Documentação
├── css/
│   ├── style.css           # Estilos principais
│   ├── admin.css           # Estilos admin
│   ├── reset-password.css  # Estilos recuperação
│   └── sexyshop.css        # Estilos seção adulta
├── js/
│   ├── script.js           # Script principal
│   ├── admin.js            # Lógica admin
│   ├── admin-security.js   # Segurança admin
│   ├── reset-password.js   # Recuperação senha
│   └── firebase-config.js  # Config Firebase
├── pages/
│   ├── admin.html          # Painel administrativo
│   ├── reset-password.html # Recuperação senha
│   └── sexyshop.html       # Seção 18+
├── images/                 # Imagens
├── config/
│   └── firebase-rules.json # Regras Firebase
└── docs/                   # Documentação
```

## 🔥 CONFIGURAÇÃO FIREBASE OBRIGATÓRIA

### **REGRAS DO FIREBASE (firebase-rules.json)**

```json
{
  "rules": {
    "products": {
      ".read": true,
      ".write": "auth != null",
      ".indexOn": ["category", "status", "createdAt"],
      "$productId": {
        ".validate": "newData.hasChildren(['name', 'price', 'category', 'status'])",
        "name": {
          ".validate": "newData.isString() && newData.val().length > 0 && newData.val().length <= 100"
        },
        "price": {
          ".validate": "newData.isString() && newData.val().matches(/^[0-9]+\\.?[0-9]{0,2}$/)"
        },
        "category": {
          ".validate": "newData.isString() && (newData.val() === 'maquiagem' || newData.val() === 'pijama' || newData.val() === 'sexy-shop')"
        },
        "status": {
          ".validate": "newData.isString() && (newData.val() === 'available' || newData.val() === 'unavailable')"
        },
        "image": {
          ".validate": "newData.isString() && newData.val().matches(/^https?:\\/\\/.+/)"
        },
        "soldOut": {
          ".validate": "newData.isBoolean()"
        },
        "isNew": {
          ".validate": "newData.isBoolean()"
        },
        "createdAt": {
          ".validate": "newData.isNumber()"
        },
        "updatedAt": {
          ".validate": "newData.isNumber()"
        }
      }
    }
  }
}
```

### **CONFIGURAÇÃO FIREBASE (firebase-config.js)**

Inclua estas funcionalidades essenciais:

- Modo desenvolvimento com logs condicionais
- Inicialização com verificação de erros
- Fallback para localStorage se Firebase falhar
- Funções CRUD completas (Create, Read, Update, Delete)
- Sistema de migração do localStorage para Firebase
- Tratamento de erros robusto

## 🛍️ FUNCIONALIDADES DA LOJA

### **PÁGINA PRINCIPAL (index.html)**

- Header com logo, navegação e ícone carrinho
- Banner hero com call-to-action
- Seções para maquiagem e pijamas
- Grid responsivo de produtos
- Footer com contatos

### **SISTEMA DE CARRINHO**

Funcionalidades obrigatórias:

- ✅ Badge contador no ícone carrinho
- ✅ Modal lateral deslizante (off-canvas)
- ✅ Aumentar/diminuir quantidades
- ✅ Remover itens individuais
- ✅ Limpar carrinho completo
- ✅ Cálculo automático do total
- ✅ Persistência com localStorage
- ✅ Animações suaves
- ✅ Integração WhatsApp para finalizar pedido

### **SEÇÃO SEXY SHOP (sexyshop.html)**

- Página separada com aviso de idade (+18)
- Design discreto mas atrativo
- Sistema de carrinho integrado
- Filtro de produtos específicos

## 🔐 SISTEMA ADMINISTRATIVO

### **SEGURANÇA OBRIGATÓRIA**

- ✅ Google reCAPTCHA v2
- ✅ Limite de 3 tentativas de login
- ✅ Bloqueio de 60 segundos após falhas
- ✅ Sistema de recuperação por email
- ✅ Validação de senha robusta

### **PAINEL ADMIN (admin.html)**

Funcionalidades essenciais:

- ✅ Login seguro (usuário: admin, senha: admin123)
- ✅ Cadastro de produtos com validação
- ✅ Edição de produtos existentes
- ✅ Upload de imagens (URL)
- ✅ Controle de categorias: maquiagem, pijama, sexy-shop
- ✅ Status: disponível/indisponível
- ✅ Marcar produtos como "novidade"
- ✅ Sistema de busca e filtros
- ✅ Estatísticas básicas

## 🎨 DESIGN E UX

### **PALETA DE CORES**

- Gradientes rosa/roxo femininos
- Cores neutras para contraste
- Acentos dourados para produtos premium

### **RESPONSIVIDADE**

- Mobile-first design
- Breakpoints: 320px, 768px, 1024px, 1200px
- Grid system flexível
- Imagens otimizadas

### **ANIMAÇÕES**

- Hover effects em botões
- Transitions suaves (300ms)
- Loading states
- Badge pulsante no carrinho

## 📱 INTEGRAÇÕES OBRIGATÓRIAS

### **WHATSAPP**

- Integração automática para finalizar pedidos
- Formatação de mensagem com:
  - Lista de produtos
  - Quantidades
  - Valor total
  - Dados do cliente (nome, endereço)

### **EMAILJS (Recuperação de Senha)**

- Envio de códigos de 6 dígitos
- Templates profissionais
- Validação de tempo (10 minutos)

## 🔧 TECNOLOGIAS OBRIGATÓRIAS

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Backend**: Firebase Realtime Database
- **Auth**: Sistema customizado + reCAPTCHA
- **Storage**: Firebase Storage (futuro)
- **Email**: EmailJS
- **Fonts**: Google Fonts (Poppins)

## 📋 VALIDAÇÕES ESSENCIAIS

### **PRODUTOS**

- Nome: 1-100 caracteres
- Preço: formato numérico com 2 casas decimais
- Categoria: apenas valores permitidos
- URL da imagem: formato válido
- Status: available/unavailable

### **FORMULÁRIOS**

- Validação de campos obrigatórios
- Sanitização de inputs
- Feedback visual de erros
- Confirmações de ações

## 🚀 CONFIGURAÇÃO INICIAL

### **PASSO 1**: Configurar Firebase

1. Criar projeto no Firebase Console
2. Ativar Realtime Database
3. Configurar regras de segurança
4. Obter chaves de configuração
5. Configurar domínio autorizado

### **PASSO 2**: Configurar reCAPTCHA

1. Registrar site no Google reCAPTCHA
2. Obter chaves pública e privada
3. Configurar domínios autorizados
4. Integrar com sistema de login

### **PASSO 3**: Configurar EmailJS

1. Criar conta EmailJS
2. Configurar serviço de email
3. Criar template para recuperação
4. Obter chaves de API

## 📚 DOCUMENTAÇÃO OBRIGATÓRIA

Crie arquivos de documentação em `docs/`:

- `FIREBASE_SETUP.md` - Guia completo Firebase
- `SECURITY_SETUP.md` - Configuração de segurança
- `CARRINHO_README.md` - Sistema de carrinho
- `DEPLOY.md` - Instruções de deploy

## ⚠️ CONSIDERAÇÕES IMPORTANTES

1. **Performance**: Otimizar carregamento de imagens
2. **SEO**: Meta tags, Open Graph, estrutura semântica
3. **Acessibilidade**: ARIA labels, contraste, navegação por teclado
4. **Segurança**: Validação client/server, sanitização
5. **Backup**: Sistema de backup automático
6. **Monitoramento**: Logs de erro, analytics básicas

## 🎯 RESULTADO ESPERADO

Uma loja virtual completa, profissional e funcional com:

- Interface moderna e responsiva
- Sistema administrativo robusto e seguro
- Carrinho de compras completo
- Integração WhatsApp funcional
- Banco de dados em tempo real
- Documentação completa
- Código limpo e bem estruturado

---

**IMPORTANTE**: Implementar TODAS as funcionalidades listadas, seguir exatamente a estrutura de arquivos proposta e garantir que todas as validações e medidas de segurança sejam aplicadas corretamente.
