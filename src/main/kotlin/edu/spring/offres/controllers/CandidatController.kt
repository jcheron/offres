package edu.spring.offres.controllers

import edu.spring.offres.entities.Formation
import edu.spring.offres.repositories.CandidatRepository
import edu.spring.offres.repositories.FormationRepository
import jakarta.servlet.http.HttpServletRequest
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.ui.ModelMap
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.servlet.ModelAndView

@Controller
@RequestMapping("/candidat")
class CandidatController {
    @Autowired
    lateinit var candidatRepository : CandidatRepository;

    @Autowired
    lateinit var formationRepository : FormationRepository

    lateinit var formation : Formation

    @RequestMapping(path = ["","index"])
    fun indexListCandidat(model : ModelMap, request: HttpServletRequest) : String
    {
        val partialRequest = request.getHeader("x-partial_request");
        model["candidats"] = candidatRepository.findAll();
        if(partialRequest == "true") {
            return "/candidat/tbodyPart";
        } else {
            return "/candidat/index";
        }
    }

    @GetMapping("/getByFormation")
    fun listCandidatByFormation(model: ModelMap, request : HttpServletRequest) : String {
        val partialRequest = request.getHeader("x-partial_request");
        model["formations"] = formationRepository.findAll();
        if(partialRequest == "true") {
            return "/candidat/tbodyPart";
        } else {
            return "/candidat/index";
        }
    }
}