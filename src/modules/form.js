import { getClientDetails } from "../server/api-fetch";
import { showUserInfo } from "../modules/showUserInfo.js";
import {showHistory} from "../modules/showHistory.js";
import {showFidelity} from "../modules/showFidelity.js";
import {showProgress} from "../modules/showProgress.js";
import { showGiftModal } from "../modules/modal.js";

const form = document.querySelector("form");
const input = document.getElementById("id-cartao");
const MAXIMO_CARACTERES_INPUT = 15;


input.addEventListener('input', (event) => {
  /*let value = event.target.value.replace(/\D/g, '');

  value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '$1-$2-$3-$4');

  value = value.substring(0, MAXIMO_CARACTERES_INPUT);

  event.target.value = value;*/
  let value = input.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    
  // Aplica a máscara conforme o usuário digita
  if (value.length > 3 && value.length <= 6) {
    value = value.replace(/(\d{3})(\d+)/, '$1-$2');
  } else if (value.length > 6 && value.length <= 9) {
    value = value.replace(/(\d{3})(\d{3})(\d+)/, '$1-$2-$3');
  } else if (value.length > 9) {
    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1-$2-$3-$4');
  }

  input.value = value;
})

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const id = input.value;
  const client = await getClientDetails({ id });

  if(client){
    showUserInfo(client);
    showHistory(client);
    showFidelity(client);
    showProgress(client);
 
    const {cutsNeeded, totalCuts } = client.loyaltyCard;
    console.log(cutsNeeded, totalCuts)
    if (totalCuts === cutsNeeded){
      showGiftModal();    
    } 
  }
})