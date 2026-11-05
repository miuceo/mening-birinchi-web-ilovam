import { useState, useEffect } from "react";
import {
  Search,
  ChevronRight,
  ShoppingBag,
  Heart,
  Share2,
  MessageSquare,
  Calendar,
  CloudSun,
  Trash2,
  X,
  Filter,
  ArrowUpDown,
  CheckCircle,
  Plus,
  Minus,
  PenTool,
  Bookmark
} from "lucide-react";

// Types
interface Article {
  id: string;
  title: string;
  category: "ARCHITECTURE" | "FASHION" | "MINIMALISM";
  date: string;
  author: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string;
  quote: string;
}

interface ArtPiece {
  id: string;
  title: string;
  category: "SCULPTURE" | "PAINTING" | "ARCHITECTURE" | "FASHION";
  artist: string;
  year: string;
  medium: string;
  dimensions: string;
  image: string;
  commentary: string;
}

interface BoutiqueItem {
  id: string;
  title: string;
  designer: string;
  category: "FURNITURE" | "CERAMIC" | "ACCESSORY";
  price: number;
  image: string;
  description: string;
  options: string[];
}

interface CartItem {
  item: BoutiqueItem;
  quantity: number;
  selectedOption: string;
}

interface SavedNote {
  id: string;
  title: string;
  content: string;
  date: string;
}

interface GalleryComment {
  id: string;
  pieceId: string;
  author: string;
  text: string;
  date: string;
}

// Initial Data
const ARTICLES: Article[] = [
  {
    id: "1",
    title: "The Poetics of Space: Redefining Minimalist Architecture",
    category: "ARCHITECTURE",
    date: "JUNE 24, 2026",
    author: "Elena Rostova",
    readTime: "6 MIN READ",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    excerpt: "Exploring how silence, raw concrete, and dramatic light intersections create spaces that transcend shelter, acting as physical meditations.",
    content: "Minimalist architecture is not merely the absence of ornament; it is the presence of absolute clarity. When we strip away the superfluous noise of modern decoration, we are left with the fundamental blocks of physical experience: volume, light, shadow, and texture. In the masterpieces of raw concrete and natural timber, we find a dialogue between the structured mind and the raw forces of nature. Light does not simply illuminate these spaces; it occupies them, moving slowly across pristine surfaces like a silent resident. By limiting our material palette, we allow the subtle variations of the natural world—the grain of oak, the rough grain of concrete, the passing shadow of a cloud—to take center stage.",
    quote: "Architecture is the learned game, correct and magnificent, of forms assembled in the light."
  },
  {
    id: "2",
    title: "Muted Silhouette: The Architecture of Modern High Fashion",
    category: "FASHION",
    date: "JUNE 20, 2026",
    author: "Marc Laurent",
    readTime: "5 MIN READ",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    excerpt: "How structural cutting, monochrome palettes, and heavyweight linen are replacing superficial luxury branding with quiet physical authority.",
    content: "The contemporary silhouette is undergoing a radical quietening. For decades, high fashion relied on loud logos and complex surface embellishments to announce its luxury. Today, the most visionary designers are returning to pure form. Using heavyweight organic linens, raw silks, and structural wools, garments are constructed with architectural precision. These clothes do not cling; they drape, creating an elegant space between fabric and skin. The beauty lies entirely in the fall of a shoulder, the clean termination of a hemline, and the depth of natural pigments like charcoal, stone, and indigo.",
    quote: "Simplicity is the ultimate sophistication. It is not about putting things on, but leaving them out."
  },
  {
    id: "3",
    title: "The Clay & The Hand: Organic Minimalism in Ceramic Design",
    category: "MINIMALISM",
    date: "JUNE 18, 2026",
    author: "Sora Takahashi",
    readTime: "4 MIN READ",
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80",
    excerpt: "A deep dive into the revival of handmade ceramics, where subtle imperfections are celebrated as the highest tier of aesthetic honesty.",
    content: "In our digital world, the raw tactile feel of clay represents a vital connection to the physical earth. Modern ceramicists are embracing the philosophy of wabi-sabi—finding perfection in the imperfect and transient. These objects are formed by hand, fired in wood kilns, and left unglazed on the exterior to showcase the natural iron speckles of the clay body. They serve as quiet anchors on our stone desks and wooden tables, holding nothing but light and space.",
    quote: "The clay is molded to make a vessel, but the utility of the vessel lies in the space where there is nothing."
  }
];

const GALLERY_PIECES: ArtPiece[] = [
  {
    id: "g1",
    title: "The Monolith Arch",
    category: "ARCHITECTURE",
    artist: "Jean-Paul Gautier",
    year: "2024",
    medium: "Raw Textured Concrete & Steel",
    dimensions: "240 x 180 cm",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    commentary: "A study on structural weight and the frame. The arch isolates a single patch of landscape, forcing the viewer to contemplate space as a bordered commodity."
  },
  {
    id: "g2",
    title: "Fragmented Bust",
    category: "SCULPTURE",
    artist: "Aurelia Stone",
    year: "2025",
    medium: "Reconstituted Alabaster & Plaster",
    dimensions: "65 x 40 x 32 cm",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80",
    commentary: "Reflecting on classical ruin and modern fragmentation. This bust is partially eroded by water-dripping techniques, symbolizing the beautiful decay of human memories."
  },
  {
    id: "g3",
    title: "Silent Horizon No. 4",
    category: "PAINTING",
    artist: "Isao Matsuo",
    year: "2026",
    medium: "Natural Earth Pigment on Canvas",
    dimensions: "150 x 150 cm",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
    commentary: "An absolute monochrome canvas layered with hand-ground charcoal and stone powder. The horizon is represented purely by a shifts in textural density."
  },
  {
    id: "g4",
    title: "Shadow Study in Limestone",
    category: "SCULPTURE",
    artist: "Clara Vance",
    year: "2025",
    medium: "Carved Portland Limestone",
    dimensions: "110 x 50 cm",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    commentary: "Limestone slabs carved with deep architectural grooves designed to capture changing solar shadows. The piece morphs entirely throughout the morning."
  }
];

const BOUTIQUE_ITEMS: BoutiqueItem[] = [
  {
    id: "b1",
    title: "The Bauhaus Lounge",
    designer: "Studio Minimal",
    category: "FURNITURE",
    price: 1850,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80",
    description: "Constructed with tubular hand-polished stainless steel and premium vegetable-tanned Italian saddle leather. An iconic silhouette that balances industrial strength with organic comfort.",
    options: ["Midnight Matte Leather", "Raw Tan Saddle", "Alabaster White"]
  },
  {
    id: "b2",
    title: "Tapered Clay Vessel",
    designer: "Hana Ceramics",
    category: "CERAMIC",
    price: 320,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=800&q=80",
    description: "Hand-thrown coarse stoneware from the Shigaraki region. The exterior is left completely unglazed and raw, exposing rich iron specks, while the interior features a subtle satin white glaze.",
    options: ["Coarse Grey Sand", "Ochre Clay", "Raw Umber"]
  },
  {
    id: "b3",
    title: "Tempus Minimalist Chronograph",
    designer: "Sovereign Watch Lab",
    category: "ACCESSORY",
    price: 640,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    description: "A precision Swiss movement housed inside a solid matte-brushed titanium case. Features an ultra-thin sapphire face, zero markers, and an organic-tanned black calfskin strap.",
    options: ["Charcoal Titanium", "Satin Silver", "Sienna Gold"]
  },
  {
    id: "b4",
    title: "Concrete Desk Obelisk Light",
    designer: "Klaus & Richter",
    category: "FURNITURE",
    price: 480,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    description: "An architectural cast-concrete light fixture emitting a warm soft glow from a recessed brass core. Includes an integrated solid brass touch switch and woven canvas cord.",
    options: ["Natural Sand Concrete", "Charcoal Slate", "Terracotta Clay"]
  }
];

const CURATED_QUOTES = [
  { text: "Simplicity is not the lack of clutter, but the presence of clarity.", author: "Dieter Rams" },
  { text: "Less is more.", author: "Mies van der Rohe" },
  { text: "An object should not cry out for attention, but invite a second look.", author: "Jasper Morrison" },
  { text: "Have nothing in your houses that you do not know to be useful or believe to be beautiful.", author: "William Morris" }
];

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<"JOURNAL" | "GALLERY" | "BOUTIQUE" | "DIGEST">("JOURNAL");
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");

  // Search & Filter States
  const [journalFilter, setJournalFilter] = useState<string>("ALL");
  const [journalSearch, setJournalSearch] = useState<string>("");
  const [galleryFilter, setGalleryFilter] = useState<string>("ALL");
  const [gallerySearch, setGallerySearch] = useState<string>("");
  const [boutiqueFilter, setBoutiqueFilter] = useState<string>("ALL");
  const [boutiqueSort, setBoutiqueSort] = useState<"PRICE_ASC" | "PRICE_DESC" | "NAME">("NAME");

  // Interaction States
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(ARTICLES[0]);
  const [activeArtPiece, setActiveArtPiece] = useState<ArtPiece | null>(null);
  const [activeBoutiqueItem, setActiveBoutiqueItem] = useState<BoutiqueItem | null>(null);
  const [boutiqueOption, setBoutiqueOption] = useState<string>("");
  
  // Likes & Comments State (Persistent)
  const [galleryLikes, setGalleryLikes] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem("editorial_gallery_likes");
    return saved ? JSON.parse(saved) : {};
  });
  const [galleryComments, setGalleryComments] = useState<GalleryComment[]>(() => {
    const saved = localStorage.getItem("editorial_gallery_comments");
    return saved ? JSON.parse(saved) : [
      { id: "c1", pieceId: "g1", author: "Nicholas K.", text: "The sheer presence of concrete here is astonishing. Reminds me of Tadao Ando.", date: "JUNE 24, 2026" },
      { id: "c2", pieceId: "g2", author: "Yuki M.", text: "Elegant erosion. The passage of time is literally etched into the plaster.", date: "JUNE 25, 2026" }
    ];
  });
  const [newCommentName, setNewCommentName] = useState("");
  const [newCommentText, setNewCommentText] = useState("");

  // Shopping Cart State (Persistent)
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("editorial_cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"CART" | "SUCCESS">("CART");

  // Notes State (Persistent)
  const [notes, setNotes] = useState<SavedNote[]>(() => {
    const saved = localStorage.getItem("editorial_notes");
    return saved ? JSON.parse(saved) : [
      { id: "n1", title: "Material Palette Thoughts", content: "To use more raw lime plaster, copper plate, and natural dark oak for the boutique interior mockup.", date: "JUNE 25, 2026" },
      { id: "n2", title: "Curation Philosophy", content: "Focus strictly on objects that carry a weight of silence. Avoid plastic or bright gloss finishes.", date: "JUNE 24, 2026" }
    ];
  });
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  // Quote State
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Share Notification State
  const [shareToast, setShareToast] = useState<string | null>(null);

  // Effects
  useEffect(() => {
    // Clock
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      setCurrentDate(now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }).toUpperCase());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("editorial_gallery_likes", JSON.stringify(galleryLikes));
  }, [galleryLikes]);

  useEffect(() => {
    localStorage.setItem("editorial_gallery_comments", JSON.stringify(galleryComments));
  }, [galleryComments]);

  useEffect(() => {
    localStorage.setItem("editorial_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("editorial_notes", JSON.stringify(notes));
  }, [notes]);

  // Handlers
  const toggleLike = (id: string) => {
    setGalleryLikes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAddComment = (pieceId: string) => {
    if (!newCommentName.trim() || !newCommentText.trim()) return;
    const newComment: GalleryComment = {
      id: "comment_" + Date.now(),
      pieceId,
      author: newCommentName,
      text: newCommentText,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }).toUpperCase()
    };
    setGalleryComments(prev => [newComment, ...prev]);
    setNewCommentName("");
    setNewCommentText("");
  };

  const handleAddToCart = (item: BoutiqueItem, option: string) => {
    const finalOption = option || item.options[0];
    const existing = cart.find(i => i.item.id === item.id && i.selectedOption === finalOption);
    if (existing) {
      setCart(prev => prev.map(i => i.item.id === item.id && i.selectedOption === finalOption ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart(prev => [...prev, { item, quantity: 1, selectedOption: finalOption }]);
    }
    setIsCartOpen(true);
    setActiveBoutiqueItem(null);
    triggerToast("OBJECT ADDED TO BAG");
  };

  const triggerToast = (msg: string) => {
    setShareToast(msg);
    setTimeout(() => setShareToast(null), 2500);
  };

  const updateCartQuantity = (itemId: string, option: string, delta: number) => {
    setCart(prev => {
      return prev.map(i => {
        if (i.item.id === itemId && i.selectedOption === option) {
          const newQty = i.quantity + delta;
          return newQty > 0 ? { ...i, quantity: newQty } : null;
        }
        return i;
      }).filter((i): i is CartItem => i !== null);
    });
  };

  const removeCartItem = (itemId: string, option: string) => {
    setCart(prev => prev.filter(i => !(i.item.id === itemId && i.selectedOption === option)));
  };

  // Note Handlers
  const handleSaveNote = () => {
    if (!noteTitle.trim() && !noteContent.trim()) return;
    const formattedDate = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }).toUpperCase();
    
    if (editingNoteId) {
      setNotes(prev => prev.map(n => n.id === editingNoteId ? { ...n, title: noteTitle || "Untitled Note", content: noteContent, date: formattedDate } : n));
      setEditingNoteId(null);
      triggerToast("NOTE UPDATED");
    } else {
      const newNote: SavedNote = {
        id: "note_" + Date.now(),
        title: noteTitle || "Untitled Note",
        content: noteContent,
        date: formattedDate
      };
      setNotes(prev => [newNote, ...prev]);
      triggerToast("NOTE SAVED");
    }
    setNoteTitle("");
    setNoteContent("");
  };

  const startEditNote = (note: SavedNote) => {
    setEditingNoteId(note.id);
    setNoteTitle(note.title);
    setNoteContent(note.content);
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    if (editingNoteId === id) {
      setEditingNoteId(null);
      setNoteTitle("");
      setNoteContent("");
    }
    triggerToast("NOTE TRASHED");
  };

  // Filter & Sort Logic
  const filteredArticles = ARTICLES.filter(art => {
    const matchesCategory = journalFilter === "ALL" || art.category === journalFilter;
    const matchesSearch = art.title.toLowerCase().includes(journalSearch.toLowerCase()) ||
                          art.excerpt.toLowerCase().includes(journalSearch.toLowerCase()) ||
                          art.content.toLowerCase().includes(journalSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredGallery = GALLERY_PIECES.filter(piece => {
    const matchesCategory = galleryFilter === "ALL" || piece.category === galleryFilter;
    const matchesSearch = piece.title.toLowerCase().includes(gallerySearch.toLowerCase()) ||
                          piece.artist.toLowerCase().includes(gallerySearch.toLowerCase()) ||
                          piece.commentary.toLowerCase().includes(gallerySearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const processedBoutique = BOUTIQUE_ITEMS.filter(item => {
    return boutiqueFilter === "ALL" || item.category === boutiqueFilter;
  }).sort((a, b) => {
    if (boutiqueSort === "PRICE_ASC") return a.price - b.price;
    if (boutiqueSort === "PRICE_DESC") return b.price - a.price;
    return a.title.localeCompare(b.title);
  });

  const cartSubtotal = cart.reduce((acc, current) => acc + (current.item.price * current.quantity), 0);

  return (
    <div id="app-container" className="min-h-full flex flex-col font-sans bg-[#fcfbfa] text-[#1c1c1c] selection:bg-[#991b1b]/10 selection:text-[#991b1b]">
      
      {/* Toast Notification */}
      {shareToast && (
        <div id="toast" className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#1c1c1c] text-[#fbfbfa] text-xs font-mono tracking-widest px-6 py-3 border border-[#e4e4e0] shadow-xl flex items-center gap-3 animate-fade-in">
          <span className="w-1.5 h-1.5 bg-[#991b1b] animate-ping rounded-full"></span>
          {shareToast}
        </div>
      )}

      {/* HEADER RAIL */}
      <header id="editorial-header" className="border-b border-[#e4e4e0] px-4 md:px-8 py-6 sticky top-0 bg-[#fcfbfa]/95 backdrop-blur-md z-40 transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Metadata Block Left */}
          <div id="header-metadata-left" className="flex flex-col text-[10px] font-mono tracking-widest text-[#7c7c77]">
            <span>THE EDITORIAL JOURNAL</span>
            <span>DATE: {currentDate || "LOADING..."}</span>
          </div>

          {/* Core Branding */}
          <div id="header-logo-container" className="text-center">
            <h1 id="app-branding" className="font-display text-3xl md:text-5xl font-bold tracking-tight select-none">
              THE EDITORIAL
            </h1>
            <p className="text-[9px] font-mono tracking-[0.3em] text-[#7c7c77] mt-1">
              CURATED INTERSECTIONS OF ART, ARCHITECTURE & PURE FORM
            </p>
          </div>

          {/* Time & Bag Indicator Right */}
          <div id="header-metadata-right" className="flex items-center justify-end gap-6 text-[11px] font-mono tracking-widest text-[#1c1c1c]">
            <div className="hidden md:flex flex-col text-right text-[10px] text-[#7c7c77]">
              <span>TOKYO / PARIS / REYKHOLT</span>
              <span>TIME: {currentTime || "00:00:00"}</span>
            </div>
            
            {/* Bag Button */}
            <button
              id="shopping-bag-trigger"
              onClick={() => { setIsCartOpen(true); setCheckoutStep("CART"); }}
              className="relative flex items-center gap-2 hover:text-[#991b1b] transition-colors border border-[#e4e4e0] hover:border-[#1c1c1c] px-3.5 py-2.5 bg-white shadow-sm"
            >
              <ShoppingBag className="w-4 h-4 text-[#1c1c1c]" />
              <span className="hidden sm:inline">BAG</span>
              {cart.length > 0 && (
                <span id="bag-badge" className="absolute -top-1.5 -right-1.5 bg-[#991b1b] text-white font-mono text-[9px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#fcfbfa]">
                  {cart.reduce((s, c) => s + c.quantity, 0)}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* NAVIGATION BAR */}
        <nav id="app-nav" className="flex justify-center border-t border-[#e4e4e0] mt-6 pt-4">
          <ul className="flex items-center gap-4 sm:gap-10 font-display text-xs tracking-[0.2em] font-semibold text-[#7c7c77]">
            
            <li className="relative">
              <button
                id="nav-journal"
                onClick={() => setActiveTab("JOURNAL")}
                className={`py-1 cursor-pointer transition-colors hover:text-[#1c1c1c] ${activeTab === "JOURNAL" ? "text-[#1c1c1c]" : ""}`}
              >
                01/ JOURNAL
              </button>
              {activeTab === "JOURNAL" && <div className="absolute -bottom-4 left-0 w-full h-[2px] bg-[#991b1b]" />}
            </li>

            <li className="relative">
              <button
                id="nav-gallery"
                onClick={() => setActiveTab("GALLERY")}
                className={`py-1 cursor-pointer transition-colors hover:text-[#1c1c1c] ${activeTab === "GALLERY" ? "text-[#1c1c1c]" : ""}`}
              >
                02/ GALLERY
              </button>
              {activeTab === "GALLERY" && <div className="absolute -bottom-4 left-0 w-full h-[2px] bg-[#991b1b]" />}
            </li>

            <li className="relative">
              <button
                id="nav-boutique"
                onClick={() => setActiveTab("BOUTIQUE")}
                className={`py-1 cursor-pointer transition-colors hover:text-[#1c1c1c] ${activeTab === "BOUTIQUE" ? "text-[#1c1c1c]" : ""}`}
              >
                03/ BOUTIQUE
              </button>
              {activeTab === "BOUTIQUE" && <div className="absolute -bottom-4 left-0 w-full h-[2px] bg-[#991b1b]" />}
            </li>

            <li className="relative">
              <button
                id="nav-digest"
                onClick={() => setActiveTab("DIGEST")}
                className={`py-1 cursor-pointer transition-colors hover:text-[#1c1c1c] ${activeTab === "DIGEST" ? "text-[#1c1c1c]" : ""}`}
              >
                04/ UTILITY
              </button>
              {activeTab === "DIGEST" && <div className="absolute -bottom-4 left-0 w-full h-[2px] bg-[#991b1b]" />}
            </li>

          </ul>
        </nav>
      </header>

      {/* CORE CONTAINER */}
      <main className="flex-grow flex flex-col md:p-6 p-4 max-w-[1600px] w-full mx-auto">
        
        {/* ==================== SCREEN 1: JOURNAL ==================== */}
        {activeTab === "JOURNAL" && (
          <div id="journal-screen" className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            
            {/* Control & Search Panel */}
            <div className="lg:col-span-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#e4e4e0] pb-4">
              <div className="flex flex-wrap items-center gap-2">
                {["ALL", "ARCHITECTURE", "FASHION", "MINIMALISM"].map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setJournalFilter(cat); }}
                    className={`font-mono text-[10px] tracking-widest px-4 py-2 border transition-all ${
                      journalFilter === cat
                        ? "bg-[#1c1c1c] text-white border-[#1c1c1c]"
                        : "bg-white text-[#7c7c77] border-[#e4e4e0] hover:border-[#7c7c77]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#7c7c77]" />
                <input
                  type="text"
                  placeholder="SEARCH DISPATCHES..."
                  value={journalSearch}
                  onChange={(e) => setJournalSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-[#e4e4e0] font-mono text-[10px] tracking-widest placeholder:text-[#7c7c77] focus:outline-none focus:border-[#1c1c1c]"
                />
              </div>
            </div>

            {/* Left: Article Index List (Lg Grid col-span-4) */}
            <div className="lg:col-span-4 flex flex-col gap-6 lg:border-r lg:border-[#e4e4e0] lg:pr-8">
              <h2 className="font-display text-xs tracking-widest font-bold border-b border-[#1c1c1c] pb-2 uppercase text-[#7c7c77]">
                DISPATCH CATALOG ({filteredArticles.length})
              </h2>
              {filteredArticles.length === 0 ? (
                <div className="font-mono text-[10px] tracking-widest text-[#7c7c77] py-8 text-center bg-white border border-[#e4e4e0]">
                  NO MATCHING DISPATCHES
                </div>
              ) : (
                <div className="flex flex-col gap-6 max-h-[600px] overflow-y-auto pr-2">
                  {filteredArticles.map(art => (
                    <div
                      key={art.id}
                      onClick={() => setSelectedArticle(art)}
                      className={`group cursor-pointer p-4 border transition-all ${
                        selectedArticle?.id === art.id
                          ? "bg-white border-[#1c1c1c] shadow-sm"
                          : "bg-transparent border-[#e4e4e0] hover:border-[#1c1c1c]"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[9px] font-mono tracking-wider text-[#7c7c77] mb-2">
                        <span>{art.category}</span>
                        <span>{art.date}</span>
                      </div>
                      <h3 className="font-serif text-lg font-semibold leading-tight text-[#1c1c1c] group-hover:text-[#991b1b] transition-colors mb-2">
                        {art.title}
                      </h3>
                      <p className="font-serif text-xs italic text-[#7c7c77] line-clamp-2">
                        {art.excerpt}
                      </p>
                      <div className="flex items-center gap-1.5 mt-3 text-[9px] font-mono tracking-widest text-[#1c1c1c]">
                        <span>READ DISPATCH</span>
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Sidebar: Latest Briefs */}
              <div className="border border-[#e4e4e0] p-4 bg-[#faf9f6] mt-4">
                <h3 className="font-mono text-[10px] tracking-widest font-bold border-b border-[#e4e4e0] pb-2 mb-3">
                  CORRESPONDENT NOTES
                </h3>
                <div className="flex flex-col gap-4 text-xs font-serif text-[#1c1c1c]">
                  <div>
                    <span className="font-mono text-[9px] block text-[#991b1b] mb-1">MILAN / 10:45 UTC</span>
                    <p className="italic">"We are witnessing a sudden embrace of unprocessed plaster in retail design, creating a cave-like serenity."</p>
                  </div>
                  <div className="border-t border-[#e4e4e0] pt-3">
                    <span className="font-mono text-[9px] block text-[#991b1b] mb-1">KYOTO / 03:12 UTC</span>
                    <p className="italic">"Raku-fired clay elements integrated into modern interior facades provide organic grounding to brushed steel counters."</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Active Reading Panel (Lg Grid col-span-8) */}
            <div className="lg:col-span-8">
              {selectedArticle ? (
                <article className="bg-white border border-[#e4e4e0] p-6 md:p-8 shadow-sm">
                  
                  {/* Article Metadata Header */}
                  <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono tracking-widest text-[#7c7c77] border-b border-[#e4e4e0] pb-4 mb-6">
                    <span className="bg-[#fef2f2] text-[#991b1b] px-2.5 py-1 font-semibold">{selectedArticle.category}</span>
                    <span>BY {selectedArticle.author}</span>
                    <span>•</span>
                    <span>{selectedArticle.readTime}</span>
                    <span>•</span>
                    <span>{selectedArticle.date}</span>
                  </div>

                  {/* Title */}
                  <h1 className="font-serif text-3xl md:text-5xl font-semibold leading-tight text-[#1c1c1c] mb-6">
                    {selectedArticle.title}
                  </h1>

                  {/* Large High-Res Cover Image */}
                  <div className="relative aspect-video w-full overflow-hidden border border-[#e4e4e0] mb-8 group">
                    <img
                      src={selectedArticle.image}
                      alt={selectedArticle.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute bottom-4 left-4 bg-[#1c1c1c]/90 text-white font-mono text-[9px] tracking-widest px-3 py-1.5">
                      CURATED ARCHIVE FILE // {selectedArticle.id}
                    </div>
                  </div>

                  {/* Drop Cap Excerpt Paragraph */}
                  <p className="font-serif text-lg leading-relaxed text-[#1c1c1c] drop-cap mb-6">
                    {selectedArticle.content}
                  </p>

                  {/* Elegant Quote Block */}
                  <blockquote className="border-l-4 border-[#991b1b] pl-6 py-2 my-8">
                    <p className="font-serif text-xl italic text-[#1c1c1c] leading-relaxed">
                      "{selectedArticle.quote}"
                    </p>
                    <cite className="font-mono text-[10px] tracking-widest text-[#7c7c77] mt-2 block uppercase">
                      — Curated Aesthetic Tenet
                    </cite>
                  </blockquote>

                  <p className="font-serif text-base leading-relaxed text-[#4a4a46] mb-8">
                    To engage with quiet form is to perform an act of aesthetic resistance against a world that demands continuous visual escalation. We recommend spending a few quiet minutes looking at raw material intersections, acknowledging their weight, their balance, and their ultimate serenity.
                  </p>

                  {/* Bottom Controls */}
                  <div className="flex items-center justify-between border-t border-[#e4e4e0] pt-6 mt-8">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => triggerToast("DISPATCH SAVED TO ARCHIVE")}
                        className="flex items-center gap-2 font-mono text-[10px] tracking-widest hover:text-[#991b1b] transition-colors border border-[#e4e4e0] px-4 py-2 bg-white"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>BOOKMARK</span>
                      </button>
                      <button
                        onClick={() => {
                          const url = window.location.href;
                          navigator.clipboard?.writeText?.(url);
                          triggerToast("DISPATCH SHARED (LINK COPIED)");
                        }}
                        className="flex items-center gap-2 font-mono text-[10px] tracking-widest hover:text-[#991b1b] transition-colors border border-[#e4e4e0] px-4 py-2 bg-white"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>SHARE LINK</span>
                      </button>
                    </div>
                    <span className="font-mono text-[10px] text-[#7c7c77] tracking-widest">
                      FILE: DISPATCH_0{selectedArticle.id}.TXT
                    </span>
                  </div>

                </article>
              ) : (
                <div className="h-full flex items-center justify-center border border-dashed border-[#e4e4e0] bg-white py-24 text-center">
                  <div className="max-w-md px-4">
                    <p className="font-serif text-lg italic text-[#7c7c77] mb-2">"True form is found in absolute quietude."</p>
                    <p className="font-mono text-[10px] tracking-widest text-[#7c7c77]">SELECT A DISPATCH FROM THE CATALOG INDEX TO BEGIN READING.</p>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

        {/* ==================== SCREEN 2: GALLERY ==================== */}
        {activeTab === "GALLERY" && (
          <div id="gallery-screen" className="flex flex-col gap-8 animate-fade-in">
            
            {/* Header Description & Search */}
            <div className="border-b border-[#e4e4e0] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight">Art & Architecture Gallery</h2>
                <p className="text-xs font-serif italic text-[#7c7c77] mt-1">A curated repository of physical silence, material studies, and geometric alignment.</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#7c7c77]" />
                  <input
                    type="text"
                    placeholder="SEARCH CURATED PIECES..."
                    value={gallerySearch}
                    onChange={(e) => setGallerySearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-white border border-[#e4e4e0] font-mono text-[10px] tracking-widest placeholder:text-[#7c7c77] focus:outline-none focus:border-[#1c1c1c]"
                  />
                </div>
                
                <div className="flex items-center border border-[#e4e4e0] bg-white p-1">
                  {["ALL", "SCULPTURE", "PAINTING", "ARCHITECTURE"].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setGalleryFilter(cat)}
                      className={`font-mono text-[9px] tracking-widest px-3 py-1.5 transition-all ${
                        galleryFilter === cat
                          ? "bg-[#1c1c1c] text-white"
                          : "text-[#7c7c77] hover:text-[#1c1c1c]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bento Grid Gallery */}
            {filteredGallery.length === 0 ? (
              <div className="font-mono text-[10px] tracking-widest text-[#7c7c77] py-16 text-center bg-white border border-[#e4e4e0]">
                NO CURATED PIECES MATCH SEARCH OR FILTER
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredGallery.map(piece => {
                  const liked = galleryLikes[piece.id] || false;
                  const commentCount = galleryComments.filter(c => c.pieceId === piece.id).length;
                  return (
                    <div
                      key={piece.id}
                      className="group flex flex-col bg-white border border-[#e4e4e0] hover:border-[#1c1c1c] transition-all p-4 shadow-sm"
                    >
                      {/* Image container */}
                      <div
                        onClick={() => setActiveArtPiece(piece)}
                        className="relative aspect-square w-full overflow-hidden bg-stone-100 border border-[#e4e4e0] cursor-pointer"
                      >
                        <img
                          src={piece.image}
                          alt={piece.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="bg-white/95 text-[#1c1c1c] font-mono text-[9px] tracking-widest px-4 py-2 border border-[#1c1c1c] shadow-sm">
                            VIEW CURATION
                          </span>
                        </div>
                      </div>

                      {/* Content block */}
                      <div className="flex flex-col mt-4 flex-grow">
                        <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-[#7c7c77] mb-1.5">
                          <span>{piece.category}</span>
                          <span>{piece.year}</span>
                        </div>
                        <h3 className="font-serif text-lg font-bold leading-tight text-[#1c1c1c] mb-1 group-hover:text-[#991b1b] transition-colors">
                          {piece.title}
                        </h3>
                        <p className="font-mono text-[10px] text-[#7c7c77] tracking-wider mb-3">
                          {piece.artist}
                        </p>
                        
                        {/* Summary description */}
                        <p className="font-serif text-xs italic text-[#7c7c77] line-clamp-2 mt-auto mb-4 border-t border-[#f4f4f2] pt-2">
                          {piece.commentary}
                        </p>

                        {/* Interactive footer bar */}
                        <div className="flex items-center justify-between border-t border-[#e4e4e0] pt-3">
                          <button
                            onClick={() => toggleLike(piece.id)}
                            className="flex items-center gap-1 text-[10px] font-mono tracking-widest hover:text-[#991b1b] transition-colors"
                          >
                            <Heart className={`w-3.5 h-3.5 ${liked ? "fill-[#991b1b] text-[#991b1b]" : "text-[#7c7c77]"}`} />
                            <span>{liked ? "LIKED" : "LIKE"}</span>
                          </button>
                          
                          <button
                            onClick={() => setActiveArtPiece(piece)}
                            className="flex items-center gap-1 text-[10px] font-mono tracking-widest hover:text-[#991b1b] transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-[#7c7c77]" />
                            <span>DISCUSS ({commentCount})</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Exhibition commentary notice */}
            <div className="border border-[#e4e4e0] p-6 bg-white flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#fef2f2] p-3 text-[#991b1b] border border-[#e4e4e0]">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-sm tracking-widest font-bold">CURRENT PHYSICAL EXHIBITION</h3>
                  <p className="text-xs font-serif italic text-[#7c7c77] mt-0.5">The Arch & The Shadow — Halle du Silo, Paris. Running until Oct 2026.</p>
                </div>
              </div>
              <button
                onClick={() => triggerToast("EXHIBITION CATALOG REQUESTED")}
                className="font-mono text-[10px] tracking-widest font-bold bg-[#1c1c1c] hover:bg-[#991b1b] text-white px-6 py-3 border border-[#1c1c1c] transition-colors shadow-sm"
              >
                REQUEST PRINT CATALOG
              </button>
            </div>

            {/* ART DETAILS AND GUESTBOOK MODAL */}
            {activeArtPiece && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-[#fcfbfa] w-full max-w-4xl border border-[#e4e4e0] shadow-2xl relative grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
                  
                  {/* Close button */}
                  <button
                    onClick={() => { setActiveArtPiece(null); }}
                    className="absolute top-4 right-4 z-10 bg-white border border-[#e4e4e0] p-2 hover:bg-[#991b1b] hover:text-white transition-colors shadow-md"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Left Column: Art Image & Tech specs (Md Grid col-span-6) */}
                  <div className="md:col-span-6 bg-stone-100 p-6 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#e4e4e0]">
                    <div className="aspect-square border border-[#e4e4e0] overflow-hidden bg-white shadow-sm mb-4">
                      <img
                        src={activeArtPiece.image}
                        alt={activeArtPiece.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Technical Card */}
                    <div className="bg-white border border-[#e4e4e0] p-4 text-xs font-mono tracking-wider">
                      <div className="border-b border-[#e4e4e0] pb-2 mb-2 text-[#991b1b] font-bold">
                        AESTHETIC TECHNICAL METADATA
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#f4f4f2]">
                        <span className="text-[#7c7c77]">MEDIUM:</span>
                        <span className="text-right font-semibold text-[#1c1c1c]">{activeArtPiece.medium}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#f4f4f2]">
                        <span className="text-[#7c7c77]">DIMENSIONS:</span>
                        <span className="text-right font-semibold text-[#1c1c1c]">{activeArtPiece.dimensions}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-[#7c7c77]">CURATION REF:</span>
                        <span className="text-right font-semibold text-[#1c1c1c]">{activeArtPiece.id.toUpperCase()}_ARX</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Narrative, Like and Interactive Discussion */}
                  <div className="md:col-span-6 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
                    <div>
                      <span className="font-mono text-[9px] tracking-widest text-[#7c7c77] uppercase block mb-1">
                        CURATOR EXHIBITION NARRATIVE
                      </span>
                      <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight mb-1 text-[#1c1c1c]">
                        {activeArtPiece.title}
                      </h2>
                      <p className="font-mono text-[11px] text-[#991b1b] tracking-widest font-semibold mb-4 border-b border-[#e4e4e0] pb-2">
                        {activeArtPiece.artist} // {activeArtPiece.year}
                      </p>
                      
                      <p className="font-serif text-sm leading-relaxed text-[#4a4a46] italic bg-[#faf9f6] p-4 border-l-2 border-[#1c1c1c]">
                        "{activeArtPiece.commentary}"
                      </p>

                      {/* Guest Registry Discussion */}
                      <div className="mt-6">
                        <h3 className="font-mono text-[10px] tracking-widest font-bold border-b border-[#e4e4e0] pb-2 mb-4">
                          GUEST REGISTRY NOTES ({galleryComments.filter(c => c.pieceId === activeArtPiece.id).length})
                        </h3>

                        {/* Comment input form */}
                        <div className="bg-white border border-[#e4e4e0] p-3 mb-4 flex flex-col gap-2">
                          <input
                            type="text"
                            placeholder="YOUR NAME"
                            value={newCommentName}
                            onChange={(e) => setNewCommentName(e.target.value)}
                            className="w-full bg-transparent font-mono text-[9px] tracking-widest border-b border-[#e4e4e0] pb-1 placeholder:text-[#7c7c77] focus:outline-none focus:border-[#1c1c1c]"
                          />
                          <textarea
                            placeholder="LEAVE YOUR SCHOLARLY COMMENTARY..."
                            rows={2}
                            value={newCommentText}
                            onChange={(e) => setNewCommentText(e.target.value)}
                            className="w-full bg-transparent font-serif text-xs leading-relaxed placeholder:text-[#7c7c77] focus:outline-none focus:border-none resize-none"
                          />
                          <button
                            onClick={() => handleAddComment(activeArtPiece.id)}
                            className="font-mono text-[9px] tracking-widest bg-[#1c1c1c] text-white py-1.5 px-3 self-end hover:bg-[#991b1b] transition-colors"
                          >
                            POST NOTE
                          </button>
                        </div>

                        {/* Comment listing */}
                        <div className="flex flex-col gap-3 max-h-[180px] overflow-y-auto pr-1">
                          {galleryComments.filter(c => c.pieceId === activeArtPiece.id).map(c => (
                            <div key={c.id} className="text-xs border-b border-[#f4f4f2] pb-2">
                              <div className="flex items-center justify-between font-mono text-[8px] text-[#7c7c77] mb-1">
                                <span className="font-bold text-[#1c1c1c]">{c.author}</span>
                                <span>{c.date}</span>
                              </div>
                              <p className="font-serif italic text-[#4a4a46]">{c.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    <div className="flex items-center justify-between border-t border-[#e4e4e0] pt-4 mt-6">
                      <button
                        onClick={() => toggleLike(activeArtPiece.id)}
                        className={`flex items-center gap-2 font-mono text-[10px] tracking-widest border px-4 py-2 bg-white ${
                          galleryLikes[activeArtPiece.id] ? "border-[#991b1b] text-[#991b1b]" : "border-[#e4e4e0] hover:border-[#1c1c1c]"
                        }`}
                      >
                        <Heart className="w-3.5 h-3.5 fill-current" />
                        <span>{galleryLikes[activeArtPiece.id] ? "HEARTED" : "ADD HEART"}</span>
                      </button>
                      
                      <span className="font-mono text-[8px] text-[#7c7c77] tracking-widest">
                        EST. CURATION ID: {activeArtPiece.id.toUpperCase()}
                      </span>
                    </div>

                  </div>

                </div>
              </div>
            )}

          </div>
        )}

        {/* ==================== SCREEN 3: BOUTIQUE ==================== */}
        {activeTab === "BOUTIQUE" && (
          <div id="boutique-screen" className="flex flex-col gap-8 animate-fade-in">
            
            {/* Header controls */}
            <div className="border-b border-[#e4e4e0] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight">Curated Boutique</h2>
                <p className="text-xs font-serif italic text-[#7c7c77] mt-1">A carefully selected catalog of industrial design objects, modern furniture, and raw accessories.</p>
              </div>

              {/* Filtering and sorting controls */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center border border-[#e4e4e0] bg-white p-1">
                  <span className="font-mono text-[9px] text-[#7c7c77] tracking-widest px-2 flex items-center gap-1">
                    <Filter className="w-3 h-3" /> CATEGORY:
                  </span>
                  {["ALL", "FURNITURE", "CERAMIC", "ACCESSORY"].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setBoutiqueFilter(cat)}
                      className={`font-mono text-[9px] tracking-widest px-3 py-1.5 transition-all ${
                        boutiqueFilter === cat ? "bg-[#1c1c1c] text-white" : "text-[#7c7c77] hover:text-[#1c1c1c]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="flex items-center border border-[#e4e4e0] bg-white px-2 py-1.5 gap-2">
                  <ArrowUpDown className="w-3 h-3 text-[#7c7c77]" />
                  <span className="font-mono text-[9px] text-[#7c7c77] tracking-widest">SORT BY:</span>
                  <select
                    value={boutiqueSort}
                    onChange={(e) => setBoutiqueSort(e.target.value as any)}
                    className="font-mono text-[9px] tracking-widest bg-transparent focus:outline-none text-[#1c1c1c]"
                  >
                    <option value="NAME">NAME (A-Z)</option>
                    <option value="PRICE_ASC">PRICE (LOW → HIGH)</option>
                    <option value="PRICE_DESC">PRICE (HIGH → LOW)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Boutique Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processedBoutique.map(item => (
                <div
                  key={item.id}
                  onClick={() => { setActiveBoutiqueItem(item); setBoutiqueOption(item.options[0]); }}
                  className="group flex flex-col bg-white border border-[#e4e4e0] hover:border-[#1c1c1c] cursor-pointer transition-all p-5 shadow-sm"
                >
                  {/* Image container */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 border border-[#e4e4e0] mb-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-[#1c1c1c]/95 text-white font-mono text-[9px] tracking-widest text-center py-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      DISCOVER SPECIFICATIONS
                    </div>
                  </div>

                  {/* Pricing and title details */}
                  <div className="flex flex-col flex-grow">
                    <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#7c7c77] mb-1">
                      <span>{item.category}</span>
                      <span className="text-[#1c1c1c] font-bold">${item.price} USD</span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold leading-tight text-[#1c1c1c] group-hover:text-[#991b1b] transition-colors mb-1">
                      {item.title}
                    </h3>
                    <p className="font-mono text-[10px] text-[#7c7c77] tracking-wider mb-3">
                      DESIGNED BY: {item.designer}
                    </p>
                    
                    <p className="font-serif text-xs text-[#7c7c77] line-clamp-3 border-t border-[#f4f4f2] pt-2 italic">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-1 mt-4 text-[10px] font-mono tracking-widest text-[#991b1b] font-bold">
                      <span>EXPLORE OBJECT</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Boutique Detail Drawer / Modal Overlay */}
            {activeBoutiqueItem && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-[#fcfbfa] w-full max-w-3xl border border-[#e4e4e0] shadow-2xl relative grid grid-cols-1 md:grid-cols-12 overflow-hidden max-h-[90vh]">
                  
                  {/* Close trigger */}
                  <button
                    onClick={() => setActiveBoutiqueItem(null)}
                    className="absolute top-4 right-4 z-10 bg-white border border-[#e4e4e0] p-2 hover:bg-[#991b1b] hover:text-white transition-colors shadow-md"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Product Portrait Image Column (Lg Grid col-span-5) */}
                  <div className="md:col-span-5 bg-[#faf9f6] p-6 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#e4e4e0]">
                    <div className="aspect-[3/4] border border-[#e4e4e0] overflow-hidden bg-white shadow-sm">
                      <img
                        src={activeBoutiqueItem.image}
                        alt={activeBoutiqueItem.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Specifications & Curation Details Column (Lg Grid col-span-7) */}
                  <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#7c7c77] mb-2">
                        <span>{activeBoutiqueItem.category} EDITION</span>
                        <span className="text-[#991b1b] font-bold">${activeBoutiqueItem.price} USD</span>
                      </div>
                      <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight mb-1 text-[#1c1c1c]">
                        {activeBoutiqueItem.title}
                      </h2>
                      <p className="font-mono text-[11px] text-[#7c7c77] tracking-widest uppercase mb-4 border-b border-[#e4e4e0] pb-2">
                        DESIGNED BY: {activeBoutiqueItem.designer}
                      </p>

                      <p className="font-serif text-sm leading-relaxed text-[#4a4a46] mb-6">
                        {activeBoutiqueItem.description}
                      </p>

                      {/* Custom Materials Select */}
                      <div className="mb-6">
                        <label className="block font-mono text-[10px] tracking-widest text-[#7c7c77] font-bold mb-2">
                          SELECT MATERIAL / FINISH:
                        </label>
                        <div className="flex flex-col gap-2">
                          {activeBoutiqueItem.options.map(opt => (
                            <button
                              key={opt}
                              onClick={() => setBoutiqueOption(opt)}
                              className={`flex items-center justify-between px-4 py-2.5 border font-mono text-[10px] tracking-widest text-left transition-all ${
                                boutiqueOption === opt
                                  ? "bg-[#1c1c1c] text-white border-[#1c1c1c] font-bold"
                                  : "bg-white text-[#1c1c1c] border-[#e4e4e0] hover:border-[#1c1c1c]"
                              }`}
                            >
                              <span>{opt}</span>
                              {boutiqueOption === opt && <span className="w-1.5 h-1.5 bg-[#991b1b] rounded-full"></span>}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom action block */}
                    <div className="border-t border-[#e4e4e0] pt-6 mt-6 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => handleAddToCart(activeBoutiqueItem, boutiqueOption)}
                        className="flex-grow font-mono text-[10px] tracking-widest font-bold bg-[#1c1c1c] hover:bg-[#991b1b] text-white text-center py-3 border border-[#1c1c1c] transition-colors shadow-sm flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>PLACE IN SHOPPING BAG</span>
                      </button>
                      <button
                        onClick={() => triggerToast("ADDED TO CURATED WISHLIST")}
                        className="font-mono text-[10px] tracking-widest font-bold bg-white text-[#1c1c1c] hover:border-[#991b1b] hover:text-[#991b1b] px-4 py-3 border border-[#e4e4e0] transition-colors shadow-sm flex items-center justify-center gap-2"
                      >
                        <Heart className="w-3.5 h-3.5" />
                        <span className="sm:hidden lg:inline">SAVE</span>
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            )}

          </div>
        )}

        {/* ==================== SCREEN 4: UTILITY & DAILY DIGEST ==================== */}
        {activeTab === "DIGEST" && (
          <div id="digest-screen" className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            
            {/* Lg Grid Column Span 4: Quote of the Day & Weather Widget */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Weather Widget */}
              <div className="border border-[#e4e4e0] p-6 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-[#e4e4e0] pb-3 mb-4">
                  <span className="font-mono text-[10px] tracking-widest text-[#7c7c77]">CURATED LOCAL WEATHER</span>
                  <CloudSun className="w-4 h-4 text-[#991b1b]" />
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-display text-4xl font-bold">19°C</span>
                  <div className="flex flex-col">
                    <span className="font-serif text-sm font-semibold leading-tight text-[#1c1c1c]">SERENE OVERCAST</span>
                    <span className="font-mono text-[9px] text-[#7c7c77] tracking-wider">REYKJAVÍK OBSERVATORY</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[#f4f4f2] text-center font-mono text-[9px] text-[#7c7c77] tracking-wider">
                  <div>
                    <span className="block text-[#1c1c1c]">HUMIDITY</span>
                    <span>42%</span>
                  </div>
                  <div>
                    <span className="block text-[#1c1c1c]">SOLAR LVL</span>
                    <span>3 / 10</span>
                  </div>
                  <div>
                    <span className="block text-[#1c1c1c]">WIND SPEED</span>
                    <span>8 KM/H</span>
                  </div>
                </div>
              </div>

              {/* Curated quote generator */}
              <div className="border border-[#e4e4e0] p-6 bg-white shadow-sm flex flex-col justify-between min-h-[200px]">
                <div>
                  <span className="font-mono text-[10px] tracking-widest text-[#7c7c77] block border-b border-[#e4e4e0] pb-2 mb-4">
                    DAILY CURATED MAXIM
                  </span>
                  <p className="font-serif text-lg italic text-[#1c1c1c] leading-relaxed">
                    "{CURATED_QUOTES[quoteIndex].text}"
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-[#f4f4f2] pt-3 mt-4">
                  <span className="font-mono text-[9px] tracking-widest text-[#991b1b] uppercase">
                    — {CURATED_QUOTES[quoteIndex].author}
                  </span>
                  <button
                    onClick={() => setQuoteIndex(prev => (prev + 1) % CURATED_QUOTES.length)}
                    className="font-mono text-[9px] tracking-widest hover:text-[#991b1b] font-bold underline"
                  >
                    NEXT MAXIM
                  </button>
                </div>
              </div>

              {/* Quick Info */}
              <div className="border border-[#e4e4e0] p-6 bg-[#faf9f6] text-xs font-serif leading-relaxed text-[#4a4a46]">
                <h3 className="font-mono text-[10px] font-bold tracking-widest text-[#1c1c1c] border-b border-[#e4e4e0] pb-2 mb-3">
                  SYSTEM OVERVIEW
                </h3>
                <p>This workspace is powered by client-side browser caching, ensuring full data longevity across reloads. No external telemetry tags are loaded, presenting a peaceful environment centered around pure aesthetics.</p>
              </div>

            </div>

            {/* Lg Grid Column Span 8: Interactive Editorial Notes (PERSISTENT NOTEBOOK) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Text editor block */}
              <div className="border border-[#e4e4e0] p-6 bg-white shadow-sm">
                
                <div className="flex items-center justify-between border-b border-[#e4e4e0] pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <PenTool className="w-4 h-4 text-[#991b1b]" />
                    <span className="font-mono text-[10px] tracking-widest font-bold">
                      {editingNoteId ? "EDITING ARCHIVED DISPATCH NOTE" : "COMPOSE NEW EDITORIAL DISPATCH NOTE"}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-[#7c7c77]">
                    PERSISTENCE: LOCAL CACHE ACTIVE
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Note Title */}
                  <div className="flex flex-col">
                    <label className="font-mono text-[9px] tracking-widest text-[#7c7c77] mb-1 font-bold">DISPATCH NOTE HEADER</label>
                    <input
                      type="text"
                      placeholder="ENTER MEMORANDUM TITLE..."
                      value={noteTitle}
                      onChange={(e) => setNoteTitle(e.target.value)}
                      className="bg-[#faf9f6] border border-[#e4e4e0] p-3 font-mono text-[10px] tracking-widest placeholder:text-[#7c7c77] focus:outline-none focus:border-[#1c1c1c]"
                    />
                  </div>

                  {/* Note Content */}
                  <div className="flex flex-col">
                    <label className="font-mono text-[9px] tracking-widest text-[#7c7c77] mb-1 font-bold">MEMORANDUM CONTENT</label>
                    <textarea
                      placeholder="TYPE SECURE NOTES, DESIGN THOUGHTS, OR JOURNAL ENTRY..."
                      rows={6}
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      className="bg-[#faf9f6] border border-[#e4e4e0] p-4 font-serif text-sm leading-relaxed placeholder:text-[#7c7c77] focus:outline-none focus:border-[#1c1c1c] resize-none"
                    />
                  </div>

                  {/* Save Note trigger */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#f4f4f2]">
                    <div className="font-mono text-[9px] text-[#7c7c77] tracking-wider">
                      WORDS: {noteContent.trim() ? noteContent.trim().split(/\s+/).length : 0} // CHARS: {noteContent.length}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {editingNoteId && (
                        <button
                          onClick={() => { setEditingNoteId(null); setNoteTitle(""); setNoteContent(""); }}
                          className="font-mono text-[10px] tracking-widest text-[#7c7c77] hover:text-[#1c1c1c] px-3 py-2 border border-transparent"
                        >
                          CANCEL
                        </button>
                      )}
                      <button
                        onClick={handleSaveNote}
                        className="font-mono text-[10px] tracking-widest font-bold bg-[#1c1c1c] hover:bg-[#991b1b] text-white px-6 py-2.5 border border-[#1c1c1c] transition-colors shadow-sm"
                      >
                        {editingNoteId ? "UPDATE MEMORANDUM" : "ARCHIVE MEMORANDUM"}
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Saved Notes Index List */}
              <div className="border border-[#e4e4e0] p-6 bg-white shadow-sm">
                <h3 className="font-mono text-[10px] tracking-widest font-bold border-b border-[#e4e4e0] pb-2 mb-4">
                  ARCHIVED EDITORIAL DISPATCH MEMORANDUMS ({notes.length})
                </h3>

                {notes.length === 0 ? (
                  <div className="font-mono text-[10px] tracking-widest text-[#7c7c77] py-8 text-center border border-dashed border-[#e4e4e0]">
                    MEMORANDUM STORAGE EMPTY
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {notes.map(note => (
                      <div
                        key={note.id}
                        className="border border-[#e4e4e0] p-4 flex flex-col justify-between hover:border-[#1c1c1c] transition-colors group bg-[#fdfdfc]"
                      >
                        <div>
                          <div className="flex items-center justify-between text-[8px] font-mono tracking-wider text-[#7c7c77] mb-2 border-b border-[#f4f4f2] pb-1">
                            <span>{note.date}</span>
                            <span>ID: {note.id.split("_")[1] || "REF"}</span>
                          </div>
                          <h4 className="font-serif text-base font-bold leading-tight text-[#1c1c1c] group-hover:text-[#991b1b] transition-colors mb-2">
                            {note.title}
                          </h4>
                          <p className="font-serif text-xs text-[#4a4a46] line-clamp-4 whitespace-pre-wrap leading-relaxed">
                            {note.content}
                          </p>
                        </div>

                        <div className="flex items-center justify-end gap-3 border-t border-[#f4f4f2] pt-3 mt-4">
                          <button
                            onClick={() => startEditNote(note)}
                            className="font-mono text-[9px] tracking-widest hover:text-[#1c1c1c] text-[#7c7c77] transition-colors underline"
                          >
                            EDIT
                          </button>
                          <button
                            onClick={() => deleteNote(note.id)}
                            className="font-mono text-[9px] tracking-widest hover:text-[#991b1b] text-[#7c7c77] transition-colors flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>TRASH</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

      </main>

      {/* SHOPPING BAG SLIDING DRAWER OVERLAY */}
      {isCartOpen && (
        <div id="cart-drawer-backdrop" className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end animate-fade-in">
          <div
            id="cart-drawer"
            className="bg-[#fcfbfa] w-full max-w-md h-full border-l border-[#e4e4e0] shadow-2xl flex flex-col justify-between p-6 relative animate-slide-in"
          >
            
            {/* Header */}
            <div>
              <div className="flex items-center justify-between border-b border-[#e4e4e0] pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#1c1c1c]" />
                  <span className="font-mono text-xs tracking-widest font-bold">SHOPPING BAG COLLECTION</span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-white border border-[#e4e4e0] p-1.5 hover:bg-[#991b1b] hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {checkoutStep === "CART" ? (
                <>
                  {/* Cart listing */}
                  {cart.length === 0 ? (
                    <div className="font-mono text-[10px] tracking-widest text-[#7c7c77] py-24 text-center border border-dashed border-[#e4e4e0] bg-white">
                      BAG IS CURRENTLY EMPTY
                      <p className="font-serif text-xs italic mt-2 text-[#7c7c77]">"An empty space holds clean possibilities."</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-1">
                      {cart.map((cartItem, idx) => (
                        <div
                          key={`${cartItem.item.id}_${cartItem.selectedOption}`}
                          className="flex items-start gap-4 border-b border-[#f4f4f2] pb-4"
                        >
                          <div className="w-16 h-20 overflow-hidden border border-[#e4e4e0] bg-stone-100 flex-shrink-0">
                            <img
                              src={cartItem.item.image}
                              alt={cartItem.item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-grow flex flex-col">
                            <div className="flex justify-between items-start">
                              <h4 className="font-serif text-sm font-bold text-[#1c1c1c] leading-tight">
                                {cartItem.item.title}
                              </h4>
                              <button
                                onClick={() => removeCartItem(cartItem.item.id, cartItem.selectedOption)}
                                className="text-[#7c7c77] hover:text-[#991b1b] transition-colors ml-2"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            
                            <span className="font-mono text-[8px] text-[#991b1b] tracking-widest uppercase mt-0.5">
                              FINISH: {cartItem.selectedOption}
                            </span>
                            
                            <div className="flex items-center justify-between mt-3">
                              {/* Quantity controls */}
                              <div className="flex items-center border border-[#e4e4e0] bg-white">
                                <button
                                  onClick={() => updateCartQuantity(cartItem.item.id, cartItem.selectedOption, -1)}
                                  className="p-1 hover:bg-stone-50 text-[#1c1c1c]"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-mono text-[10px] px-2.5 text-[#1c1c1c] font-bold">
                                  {cartItem.quantity}
                                </span>
                                <button
                                  onClick={() => updateCartQuantity(cartItem.item.id, cartItem.selectedOption, 1)}
                                  className="p-1 hover:bg-stone-50 text-[#1c1c1c]"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              
                              <span className="font-mono text-[10px] text-[#1c1c1c] font-bold">
                                ${cartItem.item.price * cartItem.quantity} USD
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                /* Order Success View */
                <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
                  <CheckCircle className="w-12 h-12 text-[#991b1b] mb-4" />
                  <h3 className="font-serif text-2xl font-bold leading-tight text-[#1c1c1c] mb-2">
                    Aesthetic Curation Secured
                  </h3>
                  <p className="font-serif text-xs text-[#7c7c77] italic mb-6 max-w-xs">
                    "Your objects have been registered under our delivery manifest. A silent white package will arrive shortly."
                  </p>
                  
                  <div className="bg-white border border-[#e4e4e0] p-4 text-left w-full font-mono text-[9px] tracking-wider mb-6">
                    <div className="border-b border-[#e4e4e0] pb-2 mb-2 font-bold text-[#1c1c1c]">
                      SIMULATED RECEIPT LOG
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#f4f4f2]">
                      <span>MANIFEST ID:</span>
                      <span className="font-semibold">EST_DISPATCH_{Date.now().toString().slice(-6)}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#f4f4f2]">
                      <span>SECURED ITEM COUNT:</span>
                      <span className="font-semibold">
                        {cart.reduce((s, c) => s + c.quantity, 0)} UNITS
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>TOTAL TRANSACTED:</span>
                      <span className="font-semibold text-[#991b1b]">${cartSubtotal} USD</span>
                    </div>
                  </div>

                  <button
                    onClick={() => { setCart([]); setIsCartOpen(false); setCheckoutStep("CART"); }}
                    className="w-full font-mono text-[10px] tracking-widest font-bold bg-[#1c1c1c] text-white py-3 border border-[#1c1c1c] hover:bg-[#991b1b] transition-colors"
                  >
                    CONTINUE CURATING
                  </button>
                </div>
              )}
            </div>

            {/* Footer Summary / Checkout trigger */}
            {checkoutStep === "CART" && (
              <div className="border-t border-[#e4e4e0] pt-4 mt-4 bg-[#fcfbfa]">
                <div className="flex justify-between font-mono text-[11px] tracking-widest font-bold text-[#7c7c77] mb-2">
                  <span>SUBTOTAL VALUE:</span>
                  <span className="text-[#1c1c1c] font-extrabold">${cartSubtotal} USD</span>
                </div>
                <div className="text-[9px] font-mono tracking-wide text-[#7c7c77] mb-4">
                  * INCLUDES SIMULATED PRIORITY SECURE INSURED COURIER PACKAGING FROM PARIS OR TOKYO.
                </div>
                
                <button
                  disabled={cart.length === 0}
                  onClick={() => setCheckoutStep("SUCCESS")}
                  className={`w-full font-mono text-[10px] tracking-widest font-bold text-center py-3.5 border transition-colors flex items-center justify-center gap-2 ${
                    cart.length === 0
                      ? "bg-stone-50 text-stone-300 border-[#e4e4e0] cursor-not-allowed"
                      : "bg-[#1c1c1c] hover:bg-[#991b1b] text-white border-[#1c1c1c] shadow-sm"
                  }`}
                >
                  <span>SECURE CURATED ACQUISITION</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer id="editorial-footer" className="border-t border-[#e4e4e0] px-4 md:px-8 py-8 mt-12 bg-white text-center text-xs text-[#7c7c77] font-serif italic">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p>“Silence is not an absence, but a physical presence.” — Curation Motto</p>
          <div className="flex items-center gap-6 text-[10px] font-mono tracking-widest text-[#1c1c1c] not-italic font-bold">
            <button onClick={() => setActiveTab("JOURNAL")} className="hover:text-[#991b1b] transition-colors">JOURNAL</button>
            <button onClick={() => setActiveTab("GALLERY")} className="hover:text-[#991b1b] transition-colors">GALLERY</button>
            <button onClick={() => setActiveTab("BOUTIQUE")} className="hover:text-[#991b1b] transition-colors">BOUTIQUE</button>
            <button onClick={() => setActiveTab("DIGEST")} className="hover:text-[#991b1b] transition-colors">UTILITY</button>
          </div>
          <p className="font-mono text-[9px] not-italic tracking-widest">© 2026 THE EDITORIAL. ALL RIGHTS SECURED.</p>
        </div>
      </footer>

    </div>
  );
}
