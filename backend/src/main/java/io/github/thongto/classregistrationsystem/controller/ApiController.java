package io.github.thongto.classregistrationsystem.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ApiController {
    @GetMapping("/hello")
    public String hello() {
        return "thaongsa flasdkgjjaldkgj";
    }

    @GetMapping("/user")
    public String getMethodName() {
        return "api useruserulaksgjladgj;asdgser";
    }

}
