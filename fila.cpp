#include <stdio.h>
#include <stdlib.h>

typedef struct no {
    int valor;
    struct no * prox;
} Lista;

typedef struct f {
    Lista * ini;
    Lista * fim;
} Fila;

//Criar filas 
Fila * criarFila() {
    Fila * f = (Fila *)malloc(sizeof(Fila)); 
    
    if(f != NULL){
        f->fim = NULL;
        f->ini = NULL;
    }else{
        printf("Memória invalida!");
    }

    return f;
}

//Inserir
Fila * inserir(Fila * f, int v ){
    if(f == NULL){
        printf("Fila inválida");
        return f;
    }
    
    Lista * novo = (Lista *)malloc(sizeof(Lista));
    
    novo->valor = v;
    novo->prox  = NULL;

    if(f->ini == NULL){
        f->ini = novo;
        f->fim = novo;
    }else {
        f->fim->prox = novo;
        f->fim = novo;
    }
}

//Imprimir
void imprimir (Lista * f) {
    if( f == NULL) {
        printf("Pilha invalida !");
        return;
    }
    
    Lista * aux = (Lista *)malloc(sizeof(Lista));
    aux = f;
    
    while(aux != NULL){
        printf("Valo: %d\n", aux->valor);
        aux = aux->prox;
    }
}

//Remover
Fila * remover(Fila * f) {
    Lista * aux;
    
    if(f != NULL){
        aux    = f->ini;
        f->ini = f->ini->prox;
        free(aux);
    }else {
        printf("Fila n existe");
    }
    
    return f;
}

int main() {
    Fila * f =  criarFila();
    
    f = inserir(f, 38);
    f = inserir(f, 10);
    f = inserir(f, 25);
    
    f = remover(f);
    imprimir(f->ini);
    
    return 0;
}



