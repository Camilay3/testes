// Adicionar
let select = document.querySelector('select');
let itens = document.querySelector('.itens');
let listItens = [];
let body;

select.addEventListener('change', async () => {
    if (select.value != "undefined") {
        //let selecionado = document.querySelector(`[value="${select.value}"]`);

        let ind = listItens.findIndex(item => item.nome === select.value)
        if(ind != -1) {
            listItens[ind].contagem += 1;

            body = {
                "exclude": "false",
                "add": "true",
                "item": select.value
            }
            await fetch("/mod", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
            
        } else {
            let i = new Item(select.value, 1)
            listItens.push(i)

            body = {
                "exclude": "false",
                "add": "false",
                "item": select.value
            }
            //select.removeChild(selecionado);
            await fetch("/mod", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
        }
    }
    listar()
    select.value = "undefined"
});

function listar() {
    itens.innerText = "";

    /* leach(); */

    let xs = document.querySelectorAll('a');

    xs.forEach(x => {
        x.addEventListener('click', async () => {
            let divescolhida = x.parentElement; // retorna o p
            /* Caso fosse tirar do select
            let opt = document.createElement('option');
            opt.value = divescolhida.className
            opt.innerText = divescolhida.className
            select.appendChild(opt); */
            let ind = listItens.findIndex(item => item.nome === divescolhida.className);
            
            if (listItens[ind].contagem > 1) {
                listItens[ind].contagem -= 1;
                
            } else {
                listItens.splice(ind, 1);
                itens.removeChild(divescolhida);
            }

            itens.innerText = "";
            /* leach(); */
            listar();
            body = {
                "exclude": "true",
                "add": "false",
                "item": divescolhida
            }
        
            await fetch("/mod", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
        });
    })
}

function Item(nome, contagem) {
    this.nome = nome
    this.contagem = contagem
}

/* function leach() {
    listItens.forEach(li => {
        let novaDiv = document.createElement('div');
        novaDiv.className = li.nome;
        let novoMarcador = document.createElement('a');
        let novaCont = document.createElement('p');
        let novoItem = document.createElement('p');
        novoItem.textContent = li.nome;
        novoMarcador.textContent = "x";
        novaCont.textContent = li.contagem;

        novaDiv.appendChild(novoItem);
        novaDiv.appendChild(novaCont);
        novaDiv.appendChild(novoMarcador);
        itens.appendChild(novaDiv);
    });
} */