/* SH Studio: accessible navigation, configurable contact options and honest form states. */
(() => {
  'use strict';
  const cfg = window.SITE_CONFIG || {};
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const brand = String(cfg.businessName || 'SH Studio').trim();
  const shortBrand = String(cfg.shortName || 'SH').trim();
  const email = String(cfg.contactEmail || '').trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const whatsapp = String(cfg.whatsappNumber || '').replace(/\D/g, '');
  const whatsappOk = whatsapp.length >= 10 && whatsapp.length <= 15;
  const mode = ['preview', 'netlify', 'whatsapp', 'email'].includes(cfg.formMode)
    ? cfg.formMode : 'preview';
  const isLocal = ['file:', 'about:'].includes(location.protocol)
    || ['localhost', '127.0.0.1'].includes(location.hostname);

  $$('[data-brand-short]').forEach(el => { el.textContent = shortBrand; });
  $$('[data-business-name]').forEach(el => { el.textContent = brand; });
  $$('[data-tagline]').forEach(el => {
    el.textContent = cfg.tagline || 'Thoughtful websites, memorable experiences, smarter digital solutions.';
  });
  $$('[data-location]').forEach(el => {
    el.textContent = cfg.location || 'India · Working with clients worldwide';
  });

  const year = $('#copyrightYear');
  if (year) year.textContent = String(new Date().getFullYear());
  document.title = `${brand} — Creative websites. Built to be remembered.`;
  const ogTitle = $('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = document.title;
  const twitterTitle = $('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.content = document.title;

  const emailLink = $('#contactEmailLink');
  const emailPending = $('#contactEmailPending');
  const waLink = $('#contactWhatsappLink');
  if (emailOk && emailLink) {
    emailLink.href = `mailto:${email}`;
    emailLink.textContent = `${email} ↗`;
    emailLink.hidden = false;
  }
  if (whatsappOk && waLink) {
    waLink.href = `https://wa.me/${whatsapp}`;
    waLink.hidden = false;
    waLink.target = '_blank';
    waLink.rel = 'noopener noreferrer';
  }
  if ((emailOk || whatsappOk) && emailPending) emailPending.hidden = true;

  // Mobile navigation: update accessible state, close on navigation/Escape,
  // and return keyboard focus to the toggle when Escape is pressed.
  const menuBtn = $('#menuToggle');
  const nav = $('#mobileNav');
  if (menuBtn && nav) {
    const closeMenu = (restoreFocus = false) => {
      nav.hidden = true;
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Open navigation');
      if (restoreFocus) menuBtn.focus();
    };
    menuBtn.addEventListener('click', () => {
      const open = menuBtn.getAttribute('aria-expanded') !== 'true';
      nav.hidden = !open;
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      if (open) {
        const firstLink = $('a', nav);
        if (firstLink && matchMedia('(max-width: 900px)').matches) firstLink.focus();
      }
    });
    $$('a', nav).forEach(link => link.addEventListener('click', () => closeMenu()));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
        closeMenu(true);
      }
    });
    document.addEventListener('click', event => {
      if (!nav.hidden && !nav.contains(event.target) && !menuBtn.contains(event.target)) closeMenu();
    });
  }

  // Select a service only when a matching option exists.
  $$('[data-service-cta]').forEach(link => {
    link.addEventListener('click', () => {
      const value = link.dataset.serviceCta || '';
      const select = $('#projectType');
      if (select && [...select.options].some(option => option.value === value)) {
        select.value = value;
      }
    });
  });

  const form = $('#inquiryForm');
  const notice = $('#formNotice');
  const submit = $('#inquirySubmit');
  if (!form || !notice || !submit) return;

  const fields = {
    name: $('#clientName'),
    email: $('#clientEmail'),
    service: $('#projectType'),
    message: $('#projectMessage')
  };

  const validate = () => {
    for (const field of Object.values(fields)) {
      if (!field || !field.checkValidity()) {
        if (field) {
          field.reportValidity();
          field.focus();
        }
        notice.textContent = 'Please check the highlighted field and try again.';
        return false;
      }
    }
    return true;
  };

  const buildMessage = () => {
    const data = new FormData(form);
    return [
      `Hello ${brand}! I'd like to discuss a project.`,
      '',
      `Name: ${String(data.get('name') || '').trim()}`,
      `Email: ${String(data.get('email') || '').trim()}`,
      `Phone: ${String(data.get('phone') || '').trim() || 'Not provided'}`,
      `Service: ${String(data.get('projectType') || '').trim()}`,
      `Timeline: ${String(data.get('timeline') || '').trim()}`,
      '',
      'Project details:',
      String(data.get('message') || '').trim()
    ].join('\n');
  };

  const copyText = async text => {
    try {
      if (navigator.clipboard && isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (_) { /* fall through to legacy copy attempt */ }
    const helper = document.createElement('textarea');
    helper.value = text;
    helper.setAttribute('readonly', '');
    helper.setAttribute('aria-hidden', 'true');
    helper.style.position = 'fixed';
    helper.style.opacity = '0';
    helper.style.pointerEvents = 'none';
    document.body.appendChild(helper);
    helper.select();
    let copied = false;
    try { copied = document.execCommand('copy'); } catch (_) { /* unavailable */ }
    helper.remove();
    return copied;
  };

  form.addEventListener('submit', async event => {
    notice.textContent = '';
    if (!validate()) {
      event.preventDefault();
      return;
    }

    // Netlify receives a normal HTML POST only when explicitly configured.
    if (mode === 'netlify' && !isLocal) return;

    event.preventDefault();
    const message = buildMessage();

    if (mode === 'whatsapp' && whatsappOk) {
      const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      notice.textContent = 'Your WhatsApp message is ready. Review it in WhatsApp and press Send to deliver your enquiry to SH Studio. It is not sent until you press Send.';
      return;
    }

    if (mode === 'email' && emailOk) {
      const subject = `Project enquiry — ${fields.service.value}`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      notice.textContent = 'Your email draft is ready. Review it and press Send in your email app to deliver your enquiry.';
      return;
    }

    const copied = await copyText(message);
    notice.textContent = copied
      ? 'Your enquiry could not open WhatsApp. Nothing was sent. Please use the WhatsApp or email contact links on this page.'
      : 'Nothing was sent. Please use the WhatsApp or email contact links on this page.';
  });

  if (mode === 'netlify' && isLocal) {
    notice.textContent = 'Local preview: form delivery is disabled. Deploy to Netlify, enable Forms and test a live submission.';
  } else if (mode === 'preview') {
    notice.textContent = 'Your enquiry will open as a WhatsApp draft. Review it and press Send in WhatsApp to contact SH Studio.';
  } else if (mode === 'whatsapp' && !whatsappOk) {
    notice.textContent = 'WhatsApp mode is selected, but no valid WhatsApp number is configured yet.';
  } else if (mode === 'email' && !emailOk) {
    notice.textContent = 'Email mode is selected, but no valid contact email is configured yet.';
  }
})();
