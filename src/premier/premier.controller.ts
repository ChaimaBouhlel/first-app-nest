import { Controller, Delete, Get, Patch, Post, Put } from "@nestjs/common";

@Controller("premier")
export class PremierController {
  @Get()
  getPremier() {
    console.log("Method Get");
    return "Get Premier";
  }

  @Post()
  addPremier() {
    console.log("Method Post");
    return "Add Premier";
  }

  @Delete()
  deletePremier() {
    console.log("Method Delete");
    return "Delete Premier";
  }

  @Put()
  modifierPremier() {
    console.log("Method Put");
    return "Update Premier";
  }

  @Patch()
  patchPremier() {
    console.log("Method Patch");
    return "Patch Premier";
  }
}
