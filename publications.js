/* ============================================================
   PUBLICATIONS DATA — the single source of truth for the site.
   Edited by hand OR appended to by scripts/sync_scholar.py.
   The body between the markers is strict JSON (the sync script
   parses it), so: double quotes only, no trailing commas,
   newlines in strings written as \n.

   Per-entry fields:
     id        unique key, also used for bibtex
     arxivId   if set, the abstract is fetched live from the
               arXiv API when a visitor opens "abstract"
     links     website / paper / code — omit a key to hide the
               link, "" renders it as "coming soon"
     abstract  static fallback (used when no arxivId)
     highlight true = featured styling (future use)
     hidden    true = not rendered
     order     manual sort, lower first
   ============================================================ */
window.PUBLICATIONS = /* SYNC-JSON-START */ [
  {
    "id": "margaryan2026aredit",
    "title": "AR-Edit: Training-Free Streaming Video Editing without Inversion",
    "authors": [
      "Hovhannes Margaryan",
      "Quentin Bammey",
      "Christian Sandor",
      "Vicky Kalogeiton"
    ],
    "venue": "NeurIPS",
    "year": 2026,
    "pages": "",
    "links": {
      "website": "",
      "paper": "",
      "code": ""
    },
    "note": "To be released soon.",
    "abstract": "",
    "bibtex": "",
    "highlight": true,
    "hidden": false,
    "order": 1
  },
  {
    "id": "margaryan2026flowc2s",
    "arxivId": "2604.17625",
    "title": "FlowC2S: Flowing from Current to Succeeding Frames for Fast and Memory-Efficient Video Continuation",
    "authors": [
      "Hovhannes Margaryan",
      "Quentin Bammey",
      "Christian Sandor"
    ],
    "venue": "CVPR Findings",
    "year": 2026,
    "pages": "3861–3872",
    "links": {
      "website": "https://github.com/marghovo/FlowC2S",
      "paper": "https://arxiv.org/pdf/2604.17625",
      "code": "https://github.com/marghovo/FlowC2S"
    },
    "abstract": "This paper introduces a novel methodology for generating fast and memory-efficient video continuations. Our method, dubbed FlowC2S, fine-tunes a pre-trained text-to-video flow model to learn a vector field between the current and succeeding video chunks. Two design choices are key. First, we introduce inherent optimal couplings, utilizing temporally adjacent video chunks during training as a practical proxy for true optimal couplings, resulting in straighter flows. Second, we incorporate target inversion, injecting the inverted latent of the target chunk into the input representation to strengthen correspondences and improve visual fidelity. By flowing directly from current to succeeding frames, instead of the common combination of current frames with noise to generate a video continuation, we reduce the dimensionality of the model input by a factor of two. The proposed method, fine-tuned from LTXV and Wan, surpasses the state-of-the-art scores across quantitative evaluations with FID and FVD, with as few as five neural function evaluations.",
    "bibtex": "@inproceedings{margaryan2026flowc2s,\n  author    = {Margaryan, Hovhannes and Bammey, Quentin and Sandor, Christian},\n  title     = {FlowC2S: Flowing from Current to Succeeding Frames for Fast and Memory-Efficient Video Continuation},\n  booktitle = {Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR) Findings},\n  month     = {June},\n  year      = {2026},\n  pages     = {3861-3872}\n}",
    "highlight": true,
    "hidden": false,
    "order": 2
  },
  {
    "id": "margaryan2025peo",
    "arxivId": "2510.02599",
    "title": "PEO: Training-Free Aesthetic Quality Enhancement in Pre-Trained Text-to-Image Diffusion Models with Prompt Embedding Optimization",
    "authors": [
      "Hovhannes Margaryan",
      "Bo Wan",
      "Tinne Tuytelaars"
    ],
    "venue": "arXiv preprint",
    "year": 2025,
    "pages": "",
    "links": {
      "website": "https://github.com/marghovo/PEO",
      "paper": "https://arxiv.org/abs/2510.02599",
      "code": "https://github.com/marghovo/PEO"
    },
    "abstract": "This paper introduces a novel approach to aesthetic quality improvement in pre-trained text-to-image diffusion models when given a simple prompt. Our method, dubbed Prompt Embedding Optimization (PEO), leverages a pre-trained text-to-image diffusion model as a backbone and optimizes the text embedding of a given simple and uncurated prompt to enhance the visual quality of the generated image. We achieve this by a tripartite objective function that improves the aesthetic fidelity of the generated image, ensures adherence to the optimized text embedding, and minimal divergence from the initial prompt. The latter is accomplished through a prompt preservation term. Additionally, PEO is training-free and backbone-independent. Quantitative and qualitative evaluations confirm the effectiveness of the proposed method, exceeding or equating the performance of state-of-the-art text-to-image and prompt adaptation methods.",
    "bibtex": "@misc{margaryan2025peotrainingfreeaestheticquality,\n  title         = {PEO: Training-Free Aesthetic Quality Enhancement in Pre-Trained Text-to-Image Diffusion Models with Prompt Embedding Optimization},\n  author        = {Hovhannes Margaryan and Bo Wan and Tinne Tuytelaars},\n  year          = {2025},\n  eprint        = {2510.02599},\n  archivePrefix = {arXiv},\n  primaryClass  = {cs.CV},\n  url           = {https://arxiv.org/abs/2510.02599}\n}",
    "highlight": true,
    "hidden": false,
    "order": 3
  },
  {
    "id": "margaryan2024dgbd",
    "title": "DGBD: Depth Guided Branched Diffusion for Comprehensive Controllability in Multi-View Generation",
    "authors": [
      "Hovhannes Margaryan",
      "Daniil Hayrapetyan",
      "Wenyan Cong",
      "Zhangyang Wang",
      "Humphrey Shi"
    ],
    "venue": "CVPR Workshops",
    "year": 2024,
    "pages": "747–756",
    "links": {
      "paper": "https://openaccess.thecvf.com/content/CVPR2024W/3DMV/papers/Margaryan_DGBD_Depth_Guided_Branched_Diffusion_for_Comprehensive_Controllability_in_Multi-View_CVPRW_2024_paper.pdf"
    },
    "abstract": "This paper presents an innovative approach to multi-view generation that can be comprehensively controlled over both perspectives (viewpoints) and non-perspective attributes (such as depth maps). Our controllable dual-branch pipeline named Depth Guided Branched Diffusion (DGBD) leverages depth maps and perspective information to generate images from alternative viewpoints while preserving shape and size fidelity. In the first DGBD branch we fine-tune a pre-trained diffusion model on multi-view data introducing a regularized batch-aware self-attention mechanism for multi-view consistency and generalization. Direct control over perspective is then achieved through cross-attention conditioned on camera position. Meanwhile the second DGBD branch introduces non-perspective control using depth maps. Qualitative and quantitative experiments validate the effectiveness of our approach surpassing or matching the performance of state-of-the-art novel view and multi-view synthesis methods.",
    "bibtex": "@InProceedings{Margaryan_2024_CVPR,\n  author    = {Margaryan, Hovhannes and Hayrapetyan, Daniil and Cong, Wenyan and Wang, Zhangyang and Shi, Humphrey},\n  title     = {DGBD: Depth Guided Branched Diffusion for Comprehensive Controllability in Multi-View Generation},\n  booktitle = {Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR) Workshops},\n  month     = {June},\n  year      = {2024},\n  pages     = {747-756}\n}",
    "highlight": true,
    "hidden": false,
    "order": 4
  }
] /* SYNC-JSON-END */;
