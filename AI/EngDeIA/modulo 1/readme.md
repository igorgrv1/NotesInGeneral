# Engenharia de IA (PÓS) - UNIPDS

* Coordenador: Erick Wendel
* Git: https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada





# Fundamentos de IA e LLMs para Programadores

### Machine Learning, Deep Learning e Artificial Intelligence

Desmistificando os termos:

* **IA (Inteligência Artificial)** = forma que se usa para ensinar uma máquina a exec uma tarefa.
* **Machine Learning/Aprendizado de Maq** = Algorítmos que aprendem com dados
  * Usando algorítmos, conseguimos entender padrões nos dados, e então é possível prever os próximos resultados.
* **Deep Learning**: especialização de Machine Learning. É um algorítmos fazendo a identificação de padrões.



Exemplo do Wendel para Deep Learning:

> 2005, através de um smartwatch, Wendel queria passar os Slides de uma apresentação.
>
> Tentou através das coordenadas com vários **falsos positivos**, porém era muito complexo devido a variáveis matemáticas/físicas: coordenadas, velocidade, eixo XYZ.
>
> Com **deep learning**, ao invés de fazer **as regras na mão**, gravamos exemplos reais (movimentando de várias formas diferentes onde falamos o que é q funciona), e o **modelo aprende** o movimento certo.
>
> Ou seja, **via código**, fazemos IFs. Com **DL**, treinamos dnv e dnv o modelo.



TensorFlow.JS (https://www.tensorflow.org/js - Google) -> Permite rodar modelos de Machine/Deep learning pelo navegador

* Possui projetos como o pacman andar através do movimento da cabeça

Teachablemachine (https://teachablemachine.withgoogle.com/) -> Permite treinar um modelo baseado em exemplos

* Podemos tirar várias fotos de vários objetos, e após treinar o modelo, ele poderá identificar o tipo de objeto!

Kaggle (https://www.kaggle.com/) -> Possui base de dados gigantes que podem ser usadas no Teachablemachine

* Por exemplo, existe uma base com várias raças de cachorro (várias fotos de raças diferentes), que permitem o modelo ser treinado para identificar outras imagens

<img src="../imageResource/teachble.png" alt="Screenshot 2026-03-29 at 22.15.58" style="zoom:50%;" />



### Redes Neurais & Tensores

TensorFlow tem esse nome por trabalhar com **tensores**!

> Tensor = Vetores/Listas **compostas por números**!

Exemplo de um objeto

```json
{
  pessoas: [
    {
      nome: "Erick",
      idade: 30,
      corPreferida: "azul",
      cidade: "São Paulo"
    },
    {
      nome: "Ana",
      idade: 25,
      corPreferida: "vermelho",
      cidade: "Rio"
    },
  ]
}
```

Após transformar o objeto em Tensor, temos que transformar os dados no **range de 0 e 1**

* **one-hot encoding:** Transf. os atributos em colunas, e associamos o número 1 ao o que dá "match"
  * *Preferência de cor / cidade não existe range! então fica com 0 e 1 - não há 'meia cor preferida'*


![Screenshot 2026-03-29 at 22.24.25](../imageResource/tensor.png)

```json
// Primeira transformação teríamos (problema com a idade):
const tensorPessoa = [
  [30, 1, 0, 0, 1, 0, 0],
  [25, 0, 1, 0, 0, 1, 0],
  [40, 0, 0, 1, 0, 0, 1],
]
```

**Normalização**: se notarmos bem, a idade está fora do padrão 0 e 1, para isso precisamos iniciar o processo de **normalização do dado**

```json
// idade_normalizada = (idade - idade_min) / (idade_max - idade_min)
// ex: idade_normalizada = (30 - 25) / (40 - 25) = 0.33
// Após converter a idade em rangeteríamos então
const tensorPessoa = [
  [0.33, 1, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 1, 0],
  [1, 0, 0, 1, 0, 0, 1],
]
```



Rede neural irá funcionar baseado nessa estrutura:

* **Inputs**: Entrada dos dados, nesse exemplo, idade/cor/localização
* **Hidden Layer**: aqui nós vamos ter os **neurônios**, e onde é feito o cálculo das probabilidades dado um input e os exemplos que o modelo possuí.
  * Quanto mais exemplos, melhor o aprendizado!
* **Output**: Resultado final dado o treinamento e input

![Screenshot 2026-03-29 at 22.33.45](../imageResource/redeneural.png)



## Treinando Rede Neural

Treinar uma rede neural nada mais é do que encher ela de exemplos de onde vc quer chegar!

Se queremos Categorizar as pessoas, iremos treinar a rede neural fornecendo exemplos do **PORQUÊ aquela pessoa pertence ao grupo X**, e então **os neurônios (mini-calculadoras)** irão calcular a probabilidade de uma nova pessoa entregar na categoria!



> "Quanto mais dados e mais diversidade, melhor!"

```json
const categorias = [ "premium","médium","básico"]
const pessoas = {
  pessoas: [
    {
      nome: "Erick",
      idade: 30,
      corPreferida: "azul",
      cidade: "São Paulo",
      categoria: "premium
    },
    {
      nome: "Ana",
      idade: 25,
      corPreferida: "vermelho",
      cidade: "Rio",
      categoria: "médium",
    },
    {
      nome: "Carlos",
      idade: 40,
      corPreferida: "verde",
      cidade: "Curitiba",
      categoria: "básic",
    },
  ]
}
```

No exemplo acima a rede neural irá calcular a categoria baseada em:

* Cor preferida
* Cidade
* Idade



**@tensorflow/tfjs-node** - É a lib utilizada para treinarmos uma rede neural

```javascript
import tf from '@tensorflow/tfjs-node';

const tensorPessoasNormalizado = [
    [0.33, 1, 0, 0, 1, 0, 0], // Erick
    [0, 0, 1, 0, 0, 1, 0],    // Ana
    [1, 0, 0, 1, 0, 0, 1]     // Carlos
]

const labelsNomes = ["premium", "medium", "basic"]; // Ordem dos labels
const tensorLabels = [
    [1, 0, 0], // premium - Erick
    [0, 1, 0], // medium - Ana
    [0, 0, 1]  // basic - Carlos
];

// Criamos tensores de entrada (xs) e saída (ys) para treinar o modelo
const inputXs = tf.tensor2d(tensorPessoasNormalizado)
const outputYs = tf.tensor2d(tensorLabels)

inputXs.print();
outputYs.print();
```



