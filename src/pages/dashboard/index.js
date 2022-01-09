import { AppContent } from "../../components";
import { useAuth } from "../../context/auth";

import "./style.css";

export function Dashboard() {
  const { singOut } = useAuth();

  return (
    <AppContent>
      <div className="calanderChart">
        <div className="chartParent">
          <div className="mainText">Todas as consultas</div>
          <div className="calanderHeader">
            <div className="calanderButtons">
              <a className="calanderBtn active" href="#">
                Hoje
              </a>
              <a className="calanderBtn" href="#">
                Ontem
              </a>
              <a className="calanderBtn" href="#">
                Amanhã
              </a>
            </div>
            <div className="oddText">Semana 06/12 - 10/12</div>
            <div className="calanderButtons rightBtns">
              <a className="calanderBtn" href="#">
                Mês
              </a>
              <a className="calanderBtn" href="#">
                Semana
              </a>
              <a className="calanderBtn" href="#">
                Dia
              </a>
              <a className="calanderBtn active" href="#">
                Agenda
              </a>
            </div>
          </div>
          <div className="linesCalandar">
            <div className="numbersRow">
              <div className="line"></div>
              <div className="line">6h00</div>
              <div className="line"></div>
              <div className="line">7h00</div>
              <div className="line"></div>
              <div className="line">8h00</div>
              <div className="line"></div>
              <div className="line">9h00</div>
              <div className="line"></div>
              <div className="line">10h00</div>
              <div className="line"></div>
              <div className="line">11h00</div>
              <div className="line"></div>
              <div className="line">12h00</div>
              <div className="line"></div>
              <div className="line">13h00</div>
              <div className="line"></div>
              <div className="line">14h00</div>
              <div className="line"></div>
              <div className="line">15h00</div>
              <div className="line"></div>
              <div className="line">16h00</div>
              <div className="line"></div>
              <div className="line">17h00</div>
              <div className="line"></div>
              <div className="line">18h00</div>
              <div className="line"></div>
              <div className="line">19h00</div>
              <div className="line"></div>
              <div className="line">20h00</div>
            </div>
            <div className="dateRow active secondRow">
              <div className="line">Segunda-feira 06/12</div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="pactente">Pactente XXX</div>
              <div className="pactente green">Pactente XPTO</div>
            </div>
            <div className="dateRow thirdRow">
              <div className="line">Terça-feira 06/12</div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="pactente">Pactente XXX</div>
              <div className="pactente green">Pactente XPTO</div>
            </div>
            <div className="dateRow">
              <div className="line">Quarta-feira 06/12</div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
            <div className="dateRow fourthRow">
              <div className="line">Quinta-feira 06/12</div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="pactente green">Pactente XPTO</div>
            </div>
            <div className="dateRow fifthRow">
              <div className="line">Sexta-feira 06/12</div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="pactente">Pactente XXX</div>
            </div>
            <div className="dateRow">
              <div className="line">Sábado 06/12</div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
            <div className="dateRow">
              <div className="line">Domingo 06/12</div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
        </div>
      </div>
    </AppContent>
  );
}
