var ContatoPage = new require('./pages/contatoPage');

describe('Página para cadastro e edição de contatos', function() {
    
    var pagina = new ContatoPage();
    
    beforeEach(function() {
        pagina.visitar();
    });
    
    it('Deve cadastrar um contato', function() {
        
        var aleatorio = Math.floor((Math.random() * 10000000) + 1);
        var nome = 'teste' + aleatorio;
        var email = 'teste@email.com' + aleatorio;
        
        
        pagina.digitarNome('teste' + aleatorio);
        pagina.digitarEmail('teste@email' + aleatorio);
        pagina.selecionarPrimeiraEmergenciaDaLista();
        pagina.salvar();
        expect(pagina.obterMensagem()).toContain('sucesso');
    }); 
    
    
});