# Rich MarkDown To HTML

Use heading titles, strong, italic and strong-italic text to add color

## Conventions from Rich MarkDown

```
# Heading level 1                       ->      <h1>Heading level 1</h1>
# |#F93|Heading level 1                 ->      <h1 style="color:#F93">Heading level 1</h1>
## Heading level 2                      ->      <h2>Heading level 2</h2>
## |#F93|Heading level 2                ->      <h2 style="color:#F93">Heading level 2</h2>
### Heading level 3                     ->      <h3>Heading level 3</h3>
### |#F93|Heading level 3               ->      <h3 style="color:#F93">Heading level 3</h3>
#### Heading level 4                    ->      <h4>Heading level 4</h4>
#### |#F93|Heading level 4              ->      <h4 style="color:#F93">Heading level 4</h4>

**strong text**                         ->      <strong>strong text</strong>
**|2BD|strong text**                    ->      <strong style="color:#2BD">strong text</strong>
**|_/img/linea.png_|texto negrita*      ->      <strong><span style="background-image:url('/img/linea.png'); background-position:50% 100%">texto negrita</span></strong>
**|2BD||_/img/linea.png_|img negrita**  ->      <strong style="color:#2BD"><span style="background-image:url('/img/linea.png'); background-position:50% 100%">texto negrita</span></

*italic text*                           ->      <i>italic text</i>
*|3FA|italic text*                      ->      <i style="color:#3FA">italic text</i>

***strong and italic text***            ->      <strong><i>strong text</i></strong>
***|green|strong and italic text***     ->      <strong style="color:green"><i>strong text</i></strong>

··texto subrayado··                     ->      <u>texto subrayado</u>
··|_/img/linea.png_| texto subrayado··  ->      <u><span style="background-image:url('/img/linea.png'); background-position:50% 100%">texto subrayado</span></u>
```

## Regular expressions:

### Headings
```
    ^#\s(.*)
    ^##\s(.*)
    ^###\s(.*)
    ^####\s(.*)
    ^#####\s(.*)
    ^######\s(.*)
```

### italica *
[^*]\*([^\*].*?)\*

### Negrita **
[^*]\*\*([^\*].*?)\*\*

### negrita e italica ***
[^*]\*\*\*(.*?)\*\*\*

### subrayado ··
[^·]··(.*?)··

### color |...|
\|([\(\)\w#]*)\|(.*)

### imagen |_..._|
\|_([\/\w\.]*)_\|(.*?)


## DEMO

```
import pkg from 'rich-markdown-to-html';
const { parseRMD} = pkg;

const result = parseRMD(`
  **|orange|hola** pepito lopez
  *Cómo estás*
  ***negrita y cursiva***
  # |rgba(255, 255, 0, 0.5)|titulo 1
  ## titulo 2
  ### titulo 3
  #### titulo 4
  ##### |blue|titulo 5
  ###### titulo 6
  **|2BD||_/img/linea.png_|img negrita**
  otro texto sin importancia pero esta ··palabra·· va **|_https://png.pngtree.com/element_our/20200609/ourmid/pngtree-purple-underline-image_2231184.jpg_|subrayada**
  No se que mas poner
`);
console.log(result);
```