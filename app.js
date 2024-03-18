const selectMaterias = document.getElementById('materias');

function selecionaMateria(){
  fetch(selectMaterias.value)
  .then(response => response.json())
  .then(data => {
    // Processar o conteúdo do texto
    const elementoPerguntas = document.getElementById('perguntas')
    const qtdQestoes = document.getElementById('qtdQuestoes')
    elementoPerguntas.innerHTML= " "
    const revisao = data
    let questaoRetornada = retornaQuestaoAleatoria(revisao)
    let questaoEscolhida = questaoRetornada.questaoEscolhida
    let numeroQuestao = questaoRetornada.questaoAleatoria
    
    
    qtdQestoes.innerHTML=`Questões restantes: ${data.length} `
    
    const proximaQuestao = document.getElementById('proximo')

    criaPergunta(questaoEscolhida, elementoPerguntas)
    
    proximaQuestao.onclick = () =>{
      revisao.splice(numeroQuestao,1)
      if (revisao.length>0){
        elementoPerguntas.innerHTML=''
        questaoRetornada = retornaQuestaoAleatoria(revisao)
        questaoEscolhida = questaoRetornada.questaoEscolhida
        numeroQuestao = questaoRetornada.questaoAleatoria
        
        criaPergunta(questaoEscolhida, elementoPerguntas)
        
        qtdQestoes.innerHTML=`Questões restantes: ${data.length} `
        
        
      }else{
        alert("Parabéns, revisão concluída!")
      }
    }

      
    
      
  
  }).catch(error => {
    // Erro ao carregar o arquivo
    console.error('Erro ao carregar o arquivo:', error);
  });


  
  function criaPergunta(questaoPRevisao, espacoPerguntas){
    const perguntas = espacoPerguntas
    const pergunta = document.createElement('p')
    const resposta = document.createElement('input');
    const responder = document.createElement('button');
    const status = document.createElement('p');
    
    responder.textContent = "Responder"
    pergunta.textContent =  `pergunta: ${questaoPRevisao.pergunta}`

    resposta.type ='text'

    perguntas.appendChild(pergunta)
    perguntas.appendChild(resposta)
    perguntas.appendChild(responder)

    responder.onclick = () => { 
      

      if(questaoPRevisao.resposta == resposta.value){
        
        status.textContent =  `Correto!: ${questaoPRevisao.resposta}`;
      }else if(resposta.value == ''){
        status.textContent =  `Resposta em branco, responda primeiro!`;
      }else{
        
        status.textContent =  `Errado!: ${questaoPRevisao.resposta}`;
      }
      perguntas.appendChild(status)
     
  }



  }

  
}



function retornaQuestaoAleatoria(listaDQuestoes){
  let questaoAleatoria = parseInt(Math.random()*listaDQuestoes.length)
  let questaoEscolhida = listaDQuestoes[questaoAleatoria]

  return{
    questaoAleatoria,questaoEscolhida
  }
}

