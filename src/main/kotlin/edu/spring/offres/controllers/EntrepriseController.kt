package edu.spring.offres.controllers

import edu.spring.offres.entities.Entreprise
import edu.spring.offres.repositories.EntrepriseRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.ui.ModelMap
import org.springframework.web.bind.annotation.*
import java.util.*


@Controller
@RequestMapping("/entrep")
class EntrepriseController {

    @Autowired
    lateinit var entrepriseRepository: EntrepriseRepository

    @RequestMapping(path = ["","index"])
    fun indexAction(model:ModelMap):String{
        model.addAttribute("entreprises", entrepriseRepository.findAll())
        return "/entrep/index"
    }

    @GetMapping("/new")
    fun newAction(model:ModelMap):String{
        model.addAttribute("entrep",Entreprise())
        return "/entrep/form"
    }

    @PostMapping("/new")
    fun newSubmitAction(
        @ModelAttribute entrep:Entreprise,
        model: ModelMap
    ): String {
        if (entrepriseRepository.findByRs(entrep.rs) != null) {
            model.addAttribute("error", "L'entreprise existe déjà")
            model.addAttribute("entrep", entrep)
            return "/entrep/form"
        } else {
            entrepriseRepository.save(entrep)
            return "redirect:/entrep/index"
        }
    }

    @GetMapping("/rs")
    fun getEntreprises(@RequestParam("contenu") contenu: String?): ResponseEntity<List<Entreprise>>? {
        val entreprises: List<Entreprise>? = entrepriseRepository.findByRsContaining(contenu)
        return ResponseEntity.ok(entreprises)
    }

    @GetMapping("/details")
    fun getDetailsEntreprise(@RequestParam("rs") rs: String, model: ModelMap): String {
        if(entrepriseRepository.findByRs(rs) != null) model.addAttribute("entreprise",entrepriseRepository.findByRs(rs))
        return "/entrep/details"
    }
}