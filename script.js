
const quoteContainer = document.getElementById('id-quote-container');
const quoteText = document.getElementById('id-quote');
const authorText = document.getElementById('id-author');
const twitterBtn = document.getElementById('id-tweet');
const newQuoteBtn = document.getElementById('id-new-quote');
const loader = document.getElementById('id-loader');

// Loading 
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Loading Complete
function complete(){    
    if(!loader.hidden){
        loader.hidden = true;
        quoteContainer.hidden =false;
    }    
}

// Get Quote From API

async function getQuote(){

    loading();

    const proxyUrl = 'https://mighty-cove-07269.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
    
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        
        if(data.quoteAuthor === ''){
            authorText.innerText = "UnKnown";
        }
        else{
            authorText.innerText = data.quoteAuthor;
        }

        //Reduce Font Size
        if(data.quoteAuthor > 120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }

        quoteText.innerText = data.quoteText;
        complete();

    } catch (error) {
        complete();
    }

}

//Tweet Quote
function tweetQuote(){

    const quote = quoteText.innerText;
    const author = authorText.innerText;

    const twitter = `https://twitter.com/intent/tweet?text=${quote}
    - ${author}`;

    window.open(twitter,'_blank');
    
}

//Even Lister
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);

//On Load

getQuote();
