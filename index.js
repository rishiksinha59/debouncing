function debouncing(fn, delay){
    let timeout;
    return function(...args){
        clearTimeout(timeout);
        timeout=setTimeout(()=>fn.apply(this,args),delay);
    }
}
function fetchResults(q){
    const res=["Apple", "Apricot", "Banana", "Cherry", "Date", "Fig", "Grape", "Kiwi", "Lemon", "Mango", "Nectarine", "Orange", "Papaya", "Peach", "Pear", "Plum", "Pomegranate", "Raspberry", "Strawberry"];
    return new Promise((resolve)=>{
        setTimeout(()=>{
            const filteredResults = res.filter(e=>e.toLowerCase().includes(q.toLowerCase()));
            resolve(filteredResults)
        },1000)
    })
}
function updateDom(res){
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML='';
    res.map(item =>{
        const li = document.createElement('li');
        li.textContent=item;
        resultsContainer.appendChild(li);
    })
}
document.addEventListener('DOMContentLoaded',()=>{
    const searchInput = document.getElementById('search');

    const debounceFetch = debouncing(async(event)=>{
        const query=event.target.value;
        if(query.length>0){
            const res = await fetchResults(query);
            updateDom(res)
        }else{
            updateDom([])
        }
    },500)
    searchInput.addEventListener('input', debounceFetch);
})