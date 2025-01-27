import { PrismaClient } from "@prisma/client";

function generateRandomName() {
  const articles = ["The", "A", "An"];
  const adjectives = [
    "Mighty",
    "Dark",
    "Silent",
    "Golden",
    "Fiery",
    "Eternal",
    "Shadowy",
    "Ancient",
  ];
  const nouns = [
    "Nightingale",
    "Kraken",
    "Phoenix",
    "Dragon",
    "Tiger",
    "Serpent",
    "Gryphon",
    "Stag",
  ];

  const article = articles[Math.floor(Math.random() * articles.length)];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${article} ${adjective} ${noun}`;
}

// 1) Retrieve a list of all gadgets
const getGadgets = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    let gadgets = await prisma.gadget.findMany();
    if (!gadgets) throw new Error("Gadgets not found");

    gadgets = gadgets.map((gadget) => {
      return {
        ...gadget,
        "mission success probability": `${gadget.name} - ${Math.floor(
          Math.random() * 100
        )}% success probabilty`,
      };
    });

    res.json(gadgets);
  } catch (error) {
    res.status(404).json({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

// 2) Add new gadget to inventory
const addGadget = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const gadget = await prisma.gadget.create({
      data: { name: generateRandomName(), status: "Available" },
    });
    if (!gadget) throw new Error("Unable to add new gadget");
    res.json({
      message: "New gadget added successfully",
      gadget,
    });
  } catch (error) {
    res.status(500).josn({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

// 3) Update an existing gadget's information.
const updateGadget = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const body = req.body;
    const updatedGadget = await prisma.gadget.update({
      where: { id: req.params.id },
      data: { name: body.name, status: body.status },
    });
    if (!updatedGadget) throw new Error("Unable to update the gadget");
    res.json({
      message: "Gadget updated successfully",
      updatedGadget,
    });
  } catch (error) {
    res.status(500).josn({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

// 4) Delete a gadget from the inventory.
const deleteGadget = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const gadget = await prisma.gadget.delete({
      where: { id: req.params.id },
    });
    if (!gadget) throw new Error("Unable to delete the gadget");
    res.json({
      message: "Gadget deleted successfully",
      gadget,
    });
  } catch (error) {
    res.status(500).josn({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
};
export { getGadgets, addGadget, updateGadget, deleteGadget };
