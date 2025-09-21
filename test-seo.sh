#!/bin/bash

echo "🔍 Testando SEO do Modo Ride..."
echo ""

# Testa se o servidor está rodando
if curl -s http://localhost:4200 > /dev/null; then
    echo "✅ Servidor rodando em http://localhost:4200"
else
    echo "❌ Servidor não está rodando. Execute 'npm start' primeiro."
    exit 1
fi

echo ""
echo "📊 Verificando estrutura SEO..."

# Verifica meta tags principais
echo ""
echo "🏷️  Meta Tags:"
curl -s http://localhost:4200 | grep -E '<title>|<meta.*description|<meta.*keywords|<meta.*author' | sed 's/^[[:space:]]*//'

# Verifica Open Graph
echo ""
echo "📱 Open Graph:"
curl -s http://localhost:4200 | grep -E '<meta.*property="og:' | sed 's/^[[:space:]]*//'

# Verifica Schema.org
echo ""
echo "🏗️  Schema.org JSON-LD:"
curl -s http://localhost:4200 | grep -A 20 '"@type"' | head -10

# Verifica robots.txt
echo ""
echo "🤖 Robots.txt:"
curl -s http://localhost:4200/robots.txt

# Verifica sitemap
echo ""
echo "🗺️  Sitemap:"
curl -s http://localhost:4200/sitemap.xml | head -20

echo ""
echo "✅ Teste SEO concluído!"
echo ""
echo "🌐 Para testar manualmente:"
echo "   - Homepage: http://localhost:4200"
echo "   - Patinetes: http://localhost:4200/patinetes-eletricos"
echo "   - Bicicletas: http://localhost:4200/bicicletas-eletricas"
echo "   - Acessórios: http://localhost:4200/acessorios"
echo "   - Sobre: http://localhost:4200/sobre-nos"