package edu.spring.offres.controllers

import edu.spring.offres.entities.Offre
import edu.spring.offres.repositories.OffreRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.ui.ModelMap
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.view.RedirectView

@Controller
@RequestMapping("/offres")
class OffreController {

    @Autowired
    lateinit var offreRepository: OffreRepository

    @RequestMapping(path = ["","index"])
    fun indexAction(model: ModelMap):String{
        model["offres"]=offreRepository.findAll()
        return "/offres/index"
    }

    @GetMapping("/new")
    fun newAction(model:ModelMap):String{
        model["offres"]= Offre()
        return "/offres/form"
    }

    @PostMapping("/new")
    fun newSubmitAction(
            @ModelAttribute offre: Offre
    ): RedirectView {

        offreRepository.save(offre)
        return RedirectView("/offres")
    }


    @DeleteMapping("/new")
    fun newDeleteAction(            @ModelAttribute offre: Offre
    ):RedirectView{
        offreRepository.delete(offre)
        return RedirectView("/offres")
    }

}