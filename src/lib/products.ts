export interface ProductVariant {
  id: string;
  label: string;
  quantity: string;
  priceEur: number;
}

export interface Product {
  slug: string;
  name: string;
  shortBenefit: string;
  category: 'Weight Management' | 'Recovery & Repair' | 'Cognition' | 'Longevity' | 'Skin & Hair' | 'Solvent';
  featured?: boolean;
  image: string;
  variants: ProductVariant[];
  description: string;
  researchContext: string;
  keyFindings: string[];
  storage: {
    temperature: string;
    conditions: string;
    shelfLife: string;
  };
  reconstitution?: {
    solvent: string;
    volume: string;
    concentration: string;
  };
  relatedSlugs: string[];
  faqs?: { question: string; answer: string }[];
}

export const products: Product[] = [
  {
    slug: 'retatrutide',
    name: 'Retatrutide',
    shortBenefit: 'Triple GLP-1/GIP/Glucagon agonist — up to -24.2% body weight in 48 weeks (NEJM 2023)',
    category: 'Weight Management',
    featured: true,
    image: '/images/products/retatrutide.webp',
    variants: [
      { id: 'retatrutide-10mg', label: 'Retatrutide 10 mg', quantity: '10 mg', priceEur: 94 },
      { id: 'retatrutide-20mg', label: 'Retatrutide 20 mg', quantity: '20 mg', priceEur: 157 },
      { id: 'retatrutide-30mg', label: 'Retatrutide 30 mg', quantity: '30 mg', priceEur: 265 },
    ],
    description:
      'Retatrutide (LY3437943) is a novel triple-agonist peptide that simultaneously activates GLP-1, GIP, and glucagon receptors. Developed by Eli Lilly, it represents a paradigm shift in metabolic research by being the first molecule to address three incretin-based signalling pathways in parallel. The glucagon component fundamentally differentiates retatrutide from dual agonists: while GLP-1 and GIP synergistically enhance satiety and improve insulin sensitivity, glucagon receptor activation increases hepatic energy expenditure through elevated lipid oxidation and thermogenesis. In the randomised, double-blind Phase II study by Jastreboff et al. (NEJM 2023, n=338), participants on the highest dose achieved a mean weight reduction of -24.2% at 48 weeks — the strongest effect ever documented for a single peptide in clinical research. Supplied as lyophilised powder requiring reconstitution with bacteriostatic water before use.',
    researchContext:
      'Primary publication: Jastreboff et al., "Triple-Hormone-Receptor Agonist Retatrutide for Obesity — A Phase 2 Trial", New England Journal of Medicine, Vol. 389, pp. 514–526 (2023), DOI: 10.1056/NEJMoa2301972. Randomised, double-blind, placebo-controlled study across 25 US centres, 338 adults, 48 weeks. Phase III TRIUMPH programme (NCT05929066) ongoing at 45+ centres worldwide.',
    keyFindings: [
      'Mean weight reduction of -24.2% at 48 weeks (Jastreboff et al., NEJM 2023, n=338)',
      'Triple receptor activation at GLP-1, GIP, and glucagon simultaneously',
      'Hepatic steatosis reduced by up to 80% in preclinical models (Coskun et al., Cell Metabolism 2022)',
      'HbA1c improvement of -1.3% and fasting glucose -18% in the highest dose cohort',
      'Systolic blood pressure -7.2 mmHg and triglycerides -30% in post-hoc analysis',
      'Over 90% of participants on 12 mg achieved ≥5% weight reduction at 48 weeks',
      'Extended plasma half-life of ~6 days via C18 fatty acid modification — weekly dosing',
    ],
    storage: {
      temperature: '-20°C (lyophilised) / 2–8°C (reconstituted)',
      conditions: 'Protect from light and moisture',
      shelfLife: '18 months (lyophilised, sealed vial)',
    },
    reconstitution: {
      solvent: 'Bacteriostatic Water (0.9% benzyl alcohol)',
      volume: '1–2 mL',
      concentration: '10 mg/mL at 1 mL, 5 mg/mL at 2 mL',
    },
    relatedSlugs: ['bpc-157', 'mots-c', 'bacteriostatic-water'],
    faqs: [
      { question: 'What is retatrutide?', answer: 'Retatrutide (LY3437943) is a triple GLP-1/GIP/glucagon receptor agonist developed by Eli Lilly, currently under Phase III evaluation. It demonstrated a mean -24.2% body weight reduction at 48 weeks in a Phase II trial (NEJM 2023).' },
      { question: 'How does retatrutide differ from semaglutide or tirzepatide?', answer: 'Semaglutide activates GLP-1 only. Tirzepatide activates GLP-1 and GIP. Retatrutide additionally activates the glucagon receptor, adding hepatic lipid oxidation and thermogenesis as a third mechanism — contributing to its superior efficacy signal in Phase II.' },
      { question: 'How should retatrutide be stored?', answer: 'Store lyophilised vials at -20°C. Once reconstituted with bacteriostatic water, store at 2–8°C and use within 28 days.' },
    ],
  },
  {
    slug: 'bpc-157',
    name: 'BPC-157',
    shortBenefit: 'Tissue repair peptide with 100+ peer-reviewed publications on healing and recovery',
    category: 'Recovery & Repair',
    featured: true,
    image: '/images/products/bpc-157.webp',
    variants: [
      { id: 'bpc157-10mg', label: 'BPC-157 10 mg', quantity: '10 mg', priceEur: 50 },
      { id: 'bpc157-20mg', label: 'BPC-157 20 mg', quantity: '20 mg', priceEur: 80 },
      { id: 'bpc157-30mg', label: 'BPC-157 30 mg', quantity: '30 mg', priceEur: 135 },
    ],
    description:
      'BPC-157 (Body Protection Compound 157) is a synthetic pentadecapeptide derived from a protective gastric protein, comprising 15 amino acids (Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val). With over 100 peer-reviewed publications, it is one of the most extensively studied repair-associated peptides in current research. Its mechanisms centre on upregulation of growth hormone receptors in tendon fibroblasts, promotion of angiogenesis via VEGF pathways, and modulation of nitric oxide synthesis. Animal model studies demonstrate accelerated healing of tendons, ligaments, muscles, and corneal tissue. It also exhibits notable gastroprotective properties in the research literature.',
    researchContext:
      'Ongoing research at the University of Zagreb (Sikiric et al.) spanning three decades has produced the majority of published data. Key areas include tendon-to-bone healing, intestinal fistula repair, and nitric oxide pathway modulation. Research models include rats, mice, and in vitro cell cultures.',
    keyFindings: [
      'Accelerated tendon healing observed in rodent models via VEGFR2 upregulation',
      'Promoted angiogenesis through nitric oxide-dependent mechanisms',
      'Gastroprotective effects documented across multiple animal model studies',
      'Modulates dopamine and serotonin systems in CNS research models',
      '100+ peer-reviewed publications across multiple research institutions',
    ],
    storage: {
      temperature: '-20°C (lyophilised) / 2–8°C (reconstituted)',
      conditions: 'Protect from light and moisture',
      shelfLife: '24 months (lyophilised)',
    },
    reconstitution: {
      solvent: 'Bacteriostatic Water (0.9% benzyl alcohol)',
      volume: '1–2 mL',
      concentration: '10 mg/mL at 1 mL',
    },
    relatedSlugs: ['tb-500', 'bacteriostatic-water'],
    faqs: [
      { question: 'What is BPC-157?', answer: 'BPC-157 is a 15-amino-acid peptide fragment derived from a gastric protective protein. It has been studied in over 100 peer-reviewed papers for its regenerative properties in tendon, muscle, and intestinal tissue repair models.' },
    ],
  },
  {
    slug: 'tb-500',
    name: 'TB-500',
    shortBenefit: 'Thymosin Beta-4 fragment — muscle recovery and tissue regeneration research',
    category: 'Recovery & Repair',
    featured: true,
    image: '/images/products/tb-500.webp',
    variants: [
      { id: 'tb500-10mg', label: 'TB-500 10 mg', quantity: '10 mg', priceEur: 135 },
      { id: 'tb500-20mg', label: 'TB-500 20 mg', quantity: '20 mg', priceEur: 216 },
      { id: 'tb500-30mg', label: 'TB-500 30 mg', quantity: '30 mg', priceEur: 365 },
    ],
    description:
      'TB-500 is a synthetic analogue of the actin-sequestering domain of Thymosin Beta-4 (Tβ4), a naturally occurring 43-amino-acid peptide found in virtually all nucleated cells. The active fragment (amino acids 17–23, sequence Ac-LKKTETQ) retains the core biological activity of full-length Tβ4 and is substantially more stable. Research focuses on its ability to upregulate actin polymerisation, promote cell migration, and stimulate angiogenesis — processes central to tissue repair. Published studies in cardiac, musculoskeletal, and ocular repair models document significant regenerative activity. TB-500 also exhibits anti-inflammatory properties relevant to chronic injury research.',
    researchContext:
      'Thymosin Beta-4 research has been ongoing since the 1960s (Goldstein et al.). The synthetic TB-500 fragment has been studied in preclinical models for cardiac repair (Bock-Marquette et al., Nature 2004), wound healing, and skeletal muscle regeneration. RegeneRx Biopharmaceuticals has advanced full-length Tβ4 into Phase II clinical trials.',
    keyFindings: [
      'Promotes cell migration and proliferation in wound healing models',
      'Cardiac repair potential documented in murine myocardial infarction studies (Nature 2004)',
      'Upregulates actin polymerisation for cytoskeletal reorganisation',
      'Anti-inflammatory properties via down-regulation of NF-kB signalling',
      'Skeletal muscle regeneration in satellite cell studies',
    ],
    storage: {
      temperature: '-20°C (lyophilised) / 2–8°C (reconstituted)',
      conditions: 'Protect from light and moisture',
      shelfLife: '24 months (lyophilised)',
    },
    reconstitution: {
      solvent: 'Bacteriostatic Water (0.9% benzyl alcohol)',
      volume: '1–2 mL',
      concentration: '10 mg/mL at 1 mL',
    },
    relatedSlugs: ['bpc-157', 'bacteriostatic-water'],
  },
  {
    slug: 'ghk-cu',
    name: 'GHK-Cu',
    shortBenefit: 'Copper tripeptide modulating 4,000+ genes — collagen synthesis +70% in research models',
    category: 'Skin & Hair',
    featured: true,
    image: '/images/products/ghk-cu.webp',
    variants: [
      { id: 'ghkcu-100mg', label: 'GHK-Cu 100 mg', quantity: '100 mg', priceEur: 40 },
      { id: 'ghkcu-200mg', label: 'GHK-Cu 200 mg', quantity: '200 mg', priceEur: 64 },
      { id: 'ghkcu-300mg', label: 'GHK-Cu 300 mg', quantity: '300 mg', priceEur: 108 },
    ],
    description:
      'GHK-Cu (Copper Peptide GHK) is a naturally occurring tripeptide (Gly-His-Lys) with a high affinity for copper ions. First isolated from human plasma in 1973, it has emerged as one of the most extensively researched peptides in skin biology and tissue remodelling. A landmark genome-wide study (Pickart et al., 2012) demonstrated that GHK-Cu modulates the expression of over 4,000 human genes — approximately 31% of those studied — including upregulation of collagen synthesis by up to 70%, elastin production, and antioxidant enzyme expression. Research has also documented its role in promoting wound healing, hair follicle growth, and anti-inflammatory signalling.',
    researchContext:
      'Pickart L. and Margolina A., "Regenerative and Protective Actions of the GHK-Cu Peptide in the Light of the New Gene Data", International Journal of Molecular Sciences, 2018. Additionally, Pickart et al., "GHK Peptide as a Natural Modulator of Multiple Cellular Pathways in Skin Regeneration", Biomedicines, 2015.',
    keyFindings: [
      'Modulates expression of 4,000+ human genes (Pickart et al., 2012)',
      'Collagen synthesis increased by up to 70% in fibroblast studies',
      'Promotes hair follicle growth and dermal papilla cell proliferation',
      'Anti-inflammatory: down-regulates TNF-alpha and IL-6 expression',
      'Antioxidant: increases superoxide dismutase expression',
      'Wound healing acceleration documented in multiple tissue models',
    ],
    storage: {
      temperature: '2–8°C (powder and solution)',
      conditions: 'Protect from light; stable at room temperature for short term',
      shelfLife: '24 months (sealed vial)',
    },
    relatedSlugs: ['ahk-cu', 'bpc-157'],
  },
  {
    slug: 'ahk-cu',
    name: 'AHK-Cu',
    shortBenefit: 'Next-generation copper peptide for dermatology and hair biology research',
    category: 'Skin & Hair',
    image: '/images/products/ahk-cu.webp',
    variants: [
      { id: 'ahkcu-50mg', label: 'AHK-Cu 50 mg', quantity: '50 mg', priceEur: 35 },
      { id: 'ahkcu-100mg', label: 'AHK-Cu 100 mg', quantity: '100 mg', priceEur: 56 },
      { id: 'ahkcu-150mg', label: 'AHK-Cu 150 mg', quantity: '150 mg', priceEur: 84 },
    ],
    description:
      'AHK-Cu (Ala-His-Lys Copper Complex) is a next-generation copper-binding tripeptide structurally distinct from GHK-Cu. Research interest centres on its hair follicle biology applications, where it has demonstrated potent stimulation of dermal papilla cells — the specialised fibroblasts that govern hair follicle cycling. AHK-Cu exhibits a high affinity for Cu²⁺ ions and is believed to stimulate angiogenesis around hair follicles, extend the anagen (growth) phase, and modulate matrix metalloproteinase activity relevant to scalp tissue remodelling. Its stability profile makes it a subject of interest in topical delivery research.',
    researchContext:
      'Research into AHK-Cu has been largely conducted in vitro and in animal models, focusing on dermal papilla cell proliferation and hair follicle morphogenesis. Interest has grown following the established literature on GHK-Cu and the broader copper peptide class.',
    keyFindings: [
      'Potent stimulation of dermal papilla cell proliferation in vitro',
      'High Cu²⁺ binding affinity for targeted copper delivery to follicular tissue',
      'Promotes angiogenesis around hair follicles in research models',
      'Modulates matrix metalloproteinases relevant to scalp tissue remodelling',
    ],
    storage: {
      temperature: '2–8°C',
      conditions: 'Protect from light',
      shelfLife: '24 months (sealed vial)',
    },
    relatedSlugs: ['ghk-cu'],
  },
  {
    slug: 'mots-c',
    name: 'MOTS-c',
    shortBenefit: 'Mitochondrial peptide activating the AMPK pathway — insulin sensitivity and metabolic research',
    category: 'Longevity',
    featured: true,
    image: '/images/products/mots-c.webp',
    variants: [
      { id: 'motsc-20mg', label: 'MOTS-c 20 mg', quantity: '20 mg', priceEur: 130 },
      { id: 'motsc-40mg', label: 'MOTS-c 40 mg', quantity: '40 mg', priceEur: 208 },
      { id: 'motsc-60mg', label: 'MOTS-c 60 mg', quantity: '60 mg', priceEur: 312 },
    ],
    description:
      'MOTS-c (Mitochondrial Open Reading Frame of the 12S rRNA-c) is a 16-amino-acid peptide encoded within the mitochondrial genome — the first hormone discovered to be encoded by mitochondrial DNA. Identified by Lee et al. at the University of Southern California in 2015, MOTS-c activates the AMPK (AMP-activated protein kinase) pathway, a master regulator of cellular energy homeostasis. Research has documented improved insulin sensitivity, reduced adipogenesis, enhanced exercise capacity, and longevity-associated effects in animal models. It is considered a mitokine — a mitochondria-derived signalling molecule with systemic effects.',
    researchContext:
      'Lee C. et al., "The Mitochondrial-Derived Peptide MOTS-c Promotes Metabolic Homeostasis and Reduces Obesity and Insulin Resistance", Cell Metabolism, Vol. 21, pp. 443–454 (2015). Published research includes murine models of diet-induced obesity, skeletal muscle metabolism, and age-related insulin resistance.',
    keyFindings: [
      'First hormone encoded by mitochondrial DNA (Lee et al., Cell Metabolism 2015)',
      'Activates AMPK pathway — master regulator of energy homeostasis',
      'Improved insulin sensitivity in diet-induced obesity mouse models',
      'Reduced adipogenesis and increased fatty acid oxidation in vitro',
      'Enhanced skeletal muscle glucose uptake independent of insulin',
      'Circulating MOTS-c levels decline with age in humans and rodents',
    ],
    storage: {
      temperature: '-20°C (lyophilised) / 2–8°C (reconstituted)',
      conditions: 'Protect from light and moisture',
      shelfLife: '18 months (lyophilised)',
    },
    reconstitution: {
      solvent: 'Bacteriostatic Water (0.9% benzyl alcohol)',
      volume: '1–2 mL',
      concentration: '10 mg/mL at 1 mL',
    },
    relatedSlugs: ['nad', 'retatrutide', 'bacteriostatic-water'],
  },
  {
    slug: 'nad',
    name: 'NAD+',
    shortBenefit: 'Coenzyme in 500+ enzymatic reactions — longevity research published in Cell and Nature',
    category: 'Longevity',
    featured: true,
    image: '/images/products/nad.webp',
    variants: [
      { id: 'nad-500mg', label: 'NAD+ 500 mg', quantity: '500 mg', priceEur: 85 },
      { id: 'nad-1g', label: 'NAD+ 1 g', quantity: '1 g', priceEur: 136 },
      { id: 'nad-15g', label: 'NAD+ 1.5 g', quantity: '1.5 g', priceEur: 230 },
    ],
    description:
      'NAD+ (Nicotinamide Adenine Dinucleotide) is a coenzyme found in all living cells and participates in over 500 distinct enzymatic reactions. It serves as the primary electron carrier in cellular respiration and is an essential cofactor for sirtuins (longevity-associated deacetylases) and PARP enzymes (DNA repair). Research published in Cell, Nature, and Science has established that NAD+ levels decline significantly with age in both rodents and humans, and that restoration of NAD+ has systemic effects on metabolic health, DNA repair, and mitochondrial function. Supplied as high-purity lyophilised powder.',
    researchContext:
      'Key publications include Imai S. & Guarente L., "NAD+ and sirtuins in aging and disease", Trends in Cell Biology (2014); Mills K.F. et al., "Long-Term Administration of Nicotinamide Mononucleotide Mitigates Age-Associated Physiological Decline", Cell Metabolism (2016); Verdin E., "NAD+ in Aging, Metabolism, and Neurodegeneration", Science (2015).',
    keyFindings: [
      'Cofactor in 500+ enzymatic reactions across all living cells',
      'Essential for sirtuin (SIRT1–7) and PARP enzyme activity',
      'NAD+ levels decline 50%+ with age in human tissue studies',
      'NAD+ restoration improves mitochondrial function in aged mice (Mills et al., Cell Metabolism 2016)',
      'Role in circadian rhythm regulation and transcriptional control',
      'Published in Cell, Nature, Science — top-tier journals',
    ],
    storage: {
      temperature: '-20°C (lyophilised)',
      conditions: 'Protect from light and moisture; extremely hygroscopic',
      shelfLife: '12 months (lyophilised, sealed)',
    },
    relatedSlugs: ['mots-c', 'selank'],
  },
  {
    slug: 'selank',
    name: 'Selank',
    shortBenefit: 'Nootropic peptide with GABAergic modulation — developed by the Russian Academy of Sciences',
    category: 'Cognition',
    image: '/images/products/selank.webp',
    variants: [
      { id: 'selank-5mg', label: 'Selank 5 mg', quantity: '5 mg', priceEur: 35 },
      { id: 'selank-10mg', label: 'Selank 10 mg', quantity: '10 mg', priceEur: 64 },
      { id: 'selank-15mg', label: 'Selank 15 mg', quantity: '15 mg', priceEur: 108 },
    ],
    description:
      'Selank is a heptapeptide (Thr-Lys-Pro-Arg-Pro-Gly-Pro) developed by the Institute of Molecular Genetics of the Russian Academy of Sciences as an analogue of the naturally occurring tetrapeptide tuftsin. Research has focused on its nootropic properties, particularly its modulation of GABAergic signalling, which influences anxiety-related behaviours in animal models without sedative properties typical of benzodiazepines. Selank also upregulates BDNF (brain-derived neurotrophic factor) expression and modulates IL-6 cytokine activity, suggesting a dual cognitive and immunomodulatory profile in research contexts.',
    researchContext:
      'Seredenin S.B. et al., extensive publications from the Russian Academy of Sciences spanning 20+ years. Selank is registered as a pharmaceutical drug in Russia (anxiolytic) but is a research chemical outside that jurisdiction.',
    keyFindings: [
      'GABAergic modulation without benzodiazepine-like sedation in animal models',
      'Upregulates BDNF expression in rodent brain tissue studies',
      'Modulates IL-6 and other cytokines (immunomodulatory profile)',
      'Developed and patented by the Russian Academy of Sciences',
      '20+ years of published research from Russian institutions',
    ],
    storage: {
      temperature: '-20°C (lyophilised) / 2–8°C (solution)',
      conditions: 'Protect from light',
      shelfLife: '24 months (lyophilised)',
    },
    relatedSlugs: ['semax', 'nad'],
  },
  {
    slug: 'semax',
    name: 'Semax',
    shortBenefit: 'ACTH(4-10) analogue with BDNF/NGF modulation — 20+ years of published research',
    category: 'Cognition',
    image: '/images/products/semax.webp',
    variants: [
      { id: 'semax-5mg', label: 'Semax 5 mg', quantity: '5 mg', priceEur: 35 },
      { id: 'semax-10mg', label: 'Semax 10 mg', quantity: '10 mg', priceEur: 64 },
      { id: 'semax-15mg', label: 'Semax 15 mg', quantity: '15 mg', priceEur: 108 },
    ],
    description:
      'Semax is a synthetic heptapeptide analogue of ACTH(4-10) (sequence Met-Glu-His-Phe-Pro-Gly-Pro) developed at the Institute of Molecular Genetics, Russian Academy of Sciences. Unlike ACTH, Semax lacks adrenocorticotropic activity. Research focus centres on its neurotropic properties: it upregulates BDNF (brain-derived neurotrophic factor) and NGF (nerve growth factor), promotes hippocampal neuroplasticity, and has demonstrated neuroprotective effects in ischaemia models. The peptide is registered as a pharmaceutical in Russia for neurological applications. Outside Russia, it is a research compound with a substantial body of published literature.',
    researchContext:
      'Miasoedov N.F. et al., Institute of Molecular Genetics, Russian Academy of Sciences. 20+ years of published research including ischaemia models, BDNF upregulation studies, and cognitive performance assays in rodents.',
    keyFindings: [
      'ACTH(4-10) analogue without adrenocorticotropic activity',
      'Upregulates BDNF and NGF expression in hippocampal tissue',
      'Neuroprotective effects documented in cerebral ischaemia rodent models',
      'Modulates dopamine and serotonin receptor sensitivity',
      'Registered pharmaceutical in Russia — 20+ years published research',
    ],
    storage: {
      temperature: '-20°C (lyophilised) / 2–8°C (solution)',
      conditions: 'Protect from light',
      shelfLife: '24 months (lyophilised)',
    },
    relatedSlugs: ['selank', 'nad'],
  },
  {
    slug: 'bacteriostatic-water',
    name: 'Bac Water',
    shortBenefit: 'Sterile reconstitution solvent — 0.9% benzyl alcohol, pharmaceutical grade',
    category: 'Solvent',
    image: '/images/products/bacteriostatic-water.webp',
    variants: [
      { id: 'bacwater-10ml', label: 'Bac Water 10 mL', quantity: '10 mL', priceEur: 8 },
    ],
    description:
      'Bacteriostatic Water for Injection (BW) is sterile water containing 0.9% w/v benzyl alcohol as a bacteriostatic preservative. It is the standard solvent for reconstituting lyophilised research peptides, as the benzyl alcohol prevents microbial growth in multi-dose vials, extending shelf life post-reconstitution to approximately 28 days when stored at 2–8°C. Our bacteriostatic water meets pharmaceutical-grade sterility standards and is supplied in sealed glass vials.',
    researchContext:
      'Standard laboratory solvent for peptide reconstitution per USP guidelines.',
    keyFindings: [
      '0.9% benzyl alcohol bacteriostatic preservative',
      'Extends reconstituted peptide stability to ~28 days at 2–8°C',
      'Pharmaceutical-grade sterility in sealed glass vials',
      'Compatible with all lyophilised peptides in our catalogue',
    ],
    storage: {
      temperature: '15–25°C (room temperature)',
      conditions: 'Protect from freezing and excessive heat',
      shelfLife: '24 months (sealed vial)',
    },
    relatedSlugs: ['retatrutide', 'bpc-157', 'tb-500'],
  },
];

/** Flat list of ALL variants across all products (for checkout lookup) */
export const ALL_VARIANTS: ProductVariant[] = products.flatMap((p) => p.variants);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getVariantById(id: string): (ProductVariant & { product: Product }) | undefined {
  for (const product of products) {
    const variant = product.variants.find((v) => v.id === id);
    if (variant) return { ...variant, product };
  }
  return undefined;
}

export const featuredProducts = products.filter((p) => p.featured);
